from fastapi import APIRouter

router = APIRouter(prefix="/api/mode")

@router.get("/sentinel")
def activate_sentinel():
    # Start background daemon logic here
    return {"sentinel": "activated"}

@router.get("/apex")
def activate_apex():
    # Enhance Goby AI behavior
    return {"apex": "engaged"}