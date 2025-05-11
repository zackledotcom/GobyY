import os
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from fastapi_limiter.depends import RateLimiter
from fastapi_limiter import FastAPILimiter
from pydantic import BaseModel
import sqlite3
from redis import Redis

router = APIRouter(prefix="/api/memory")
DB_PATH = "./storage/goby_memory.sqlite"
os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)

# Initialize Redis for caching and rate limiting
redis_client = Redis(host="localhost", port=6379, decode_responses=True)
FastAPILimiter.init(redis_client)

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("PRAGMA journal_mode=WAL;")  # Enable Write-Ahead Logging for better concurrency
    conn.execute("CREATE TABLE IF NOT EXISTS memory (key TEXT PRIMARY KEY, value TEXT)")
    return conn

class MemoryItem(BaseModel):
    key: str
    value: str

@router.post("/", dependencies=[Depends(RateLimiter(times=5, seconds=60))])
def store_memory(item: MemoryItem):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("REPLACE INTO memory (key, value) VALUES (?, ?)", (item.key, item.value))
            conn.commit()
        return {"status": "stored"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to store memory")

@router.get("/{key}", dependencies=[Depends(RateLimiter(times=10, seconds=60))])
def retrieve_memory(key: str):
    try:
        cached_value = redis_client.get(key)
        if cached_value:
            return {"value": cached_value}

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT value FROM memory WHERE key = ?", (key,))
            result = cursor.fetchone()
            if result:
                redis_client.set(key, result[0], ex=3600)  # Cache for 1 hour
                return {"value": result[0]}
            else:
                raise HTTPException(status_code=404, detail="Key not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to retrieve memory")