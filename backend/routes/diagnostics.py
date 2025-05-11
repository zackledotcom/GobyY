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
    try:
        processes = len(subprocess.check_output(["ps", "-e"]).decode().splitlines()) - 1
    except Exception:
        processes = "unknown"

    try:
        battery = subprocess.check_output(["pmset", "-g", "batt"]).decode().strip() if platform.system() == "Darwin" else "unknown"
    except Exception:
        battery = "unknown"

    try:
        admin = "yes" if "admin" in subprocess.check_output(["id", "-Gn"]).decode().strip() else "no"
    except Exception:
        admin = "unknown"

    try:
        active_threads = len(subprocess.check_output(["ps", "-e", "-T"]).decode().splitlines()) - 1
    except Exception:
        active_threads = "unknown"

    return {
        "system": uname.system,
        "node": uname.node,
        "release": uname.release,
        "version": uname.version,
        "machine": uname.machine,
        "uptime": uptime,
        "processes": processes,
        "battery": battery,
        "admin": admin,
        "kernel": uname.version,
        "active_threads": active_threads
    }