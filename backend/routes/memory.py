from fastapi import APIRouter
from pydantic import BaseModel
import sqlite3
import os

router = APIRouter(prefix="/api/memory")
DB_PATH = "./storage/goby_memory.sqlite"
os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS memory (key TEXT PRIMARY KEY, value TEXT)")
conn.commit()

class MemoryItem(BaseModel):
    key: str
    value: str

@router.post("/")
def set_memory(item: MemoryItem):
    cursor.execute("REPLACE INTO memory (key, value) VALUES (?, ?)", (item.key, item.value))
    conn.commit()
    return {"status": "stored"}

@router.get("/{key}")
def get_memory(key: str):
    cursor.execute("SELECT value FROM memory WHERE key = ?", (key,))
    result = cursor.fetchone()
    return {"value": result[0]} if result else {"error": "Key not found"}