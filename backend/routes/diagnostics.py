from fastapi import APIRouter
import platform
import subprocess

router = APIRouter(prefix="/api/diagnostics")

@router.get("/")
def diagnostics():
    uname = platform.uname()
    try:
        uptime = subprocess.check_output(["uptime"]).decode().strip()
    except Exception:
        uptime = "unknown"
    return {
        "system": uname.system,
        "node": uname.node,
        "release": uname.release,
        "version": uname.version,
        "machine": uname.machine,
        "uptime": uptime
    }