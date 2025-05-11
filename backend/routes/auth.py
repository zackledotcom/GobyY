from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import jwt

SECRET_KEY = "your_secret_key"  # Replace with a secure key

router = APIRouter(prefix="/api/auth")

class AuthRequest(BaseModel):
    token: str

@router.post("/verify")
def verify_token(request: AuthRequest):
    try:
        payload = jwt.decode(request.token, SECRET_KEY, algorithms=["HS256"])
        return {"access": "granted", "user": payload.get("sub")}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=403, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=403, detail="Invalid token")