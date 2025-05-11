from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from fastapi_limiter import FastAPILimiter
from redis import Redis

app = FastAPI()

# Initialize Redis for rate limiting
redis_client = Redis(host="localhost", port=6379, decode_responses=True)
FastAPILimiter.init(redis_client)

# Allow all origins for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/api/ping")
def ping():
    return {"status": "alive"}

@app.post("/api/chat")
async def chat(req: Request):
    data = await req.json()
    prompt = data.get("prompt", "")
    return {"response": f"Echo: {prompt}"}

@app.get("/api/scan")
def scan():
    return {"scan": "No devices found"}

@app.get("/api/memory/{key}")
def get_memory(key: str):
    return {"value": f"value-for-{key}"}

@app.post("/api/memory")
async def set_memory(req: Request):
    data = await req.json()
    return {"status": "stored", "key": data.get("key"), "value": data.get("value")}

@app.get("/api/diagnostics")
def diagnostics():
    return {
        "cpu": "ok",
        "disk": "ok",
        "ram": "ok",
        "uptime": "1234s"
    }

@app.get("/api/tools/logs")
def logs():
    return "System logs: [LOGS HERE]"

@app.get("/api/tools/objectives")
def objectives():
    return [
        {"task": "Secure network", "priority": "High"},
        {"task": "Trace threats", "priority": "Medium"}
    ]

@app.get("/api/tools/reasoning")
def reasoning(prompt: str):
    return {
        "chain": [
            f"Input: {prompt}",
            "Analyzed context",
            "Generated response"
        ]
    }

@app.get("/api/selfcheck")
def selfcheck():
    return {
        "status": "nominal",
        "env": "clean",
        "version": "1.0.0"
    }

@app.get("/api/tools/kernel")
def kernel():
    return "Kernel diagnostics: [SAFE]"

@app.post("/api/auth/verify")
async def verify(req: Request):
    data = await req.json()
    token = data.get("token")
    return {"access": "granted" if token == "1234" else "denied"}

@app.get("/api/mode/apex")
def apex_mode():
    return {"status": "Apex mode activated"}

@app.get("/api/mode/sentinel")
def sentinel():
    return {"status": "Sentinel mode running"}

@app.on_event("startup")
async def startup_event():
    # Initialize Redis connection for rate limiting
    await FastAPILimiter.init(redis_client)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
