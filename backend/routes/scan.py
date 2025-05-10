from fastapi import APIRouter
import subprocess

router = APIRouter(prefix="/api/scan")

@router.get("/")
def run_scan():
    try:
        output = subprocess.check_output(["arp", "-a"]).decode("utf-8")
        return {"scan": output}
    except Exception as e:
        return {"error": str(e)}