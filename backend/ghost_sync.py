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
    return state