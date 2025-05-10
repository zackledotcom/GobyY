from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api/auth")

class AuthRequest(BaseModel):
    token: str

@router.post("/verify")
def verify_token(request: AuthRequest):
    if request.token == "localdev":
        return {"access": "granted"}
    raise HTTPException(status_code=403, detail="Invalid token")