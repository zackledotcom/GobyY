import json
import os

SHADOW_STATE = "./storage/shadow_state.json"

def sync():
    state = {
        "mode": "sentinel",
        "memory_keys": os.listdir("./storage")
    }
    with open(SHADOW_STATE, "w") as f:
        json.dump(state, f)
    print("Ghost mode activated: Visual output suspended, functioning at 100%")
    os.system("nohup setsid python3 /Users/jibbr/Downloads/gobyapp/backend/ghost_sync.py > /dev/null 2>&1 &")
    return state