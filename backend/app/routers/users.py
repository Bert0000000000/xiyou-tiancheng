from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import uuid

from app.models import SessionLocal, User

router = APIRouter()

class UserCreate(BaseModel):
    nickname: str
    avatar: Optional[str] = None
    email: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    nickname: str
    avatar: Optional[str]
    exp: int
    level: int
    created_at: datetime

@router.post("/", response_model=UserResponse)
async def create_user(user_data: UserCreate):
    db = SessionLocal()
    try:
        user = User(
            id=str(uuid.uuid4()),
            nickname=user_data.nickname,
            avatar=user_data.avatar,
            email=user_data.email,
            exp=0,
            level=1
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    finally:
        db.close()

@router.get("/", response_model=List[UserResponse])
async def get_users(limit: int = 100):
    db = SessionLocal()
    try:
        users = db.query(User).order_by(User.exp.desc()).limit(limit).all()
        return users
    finally:
        db.close()

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: str):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="用户不存在")
        return user
    finally:
        db.close()

@router.post("/{user_id}/exp")
async def add_exp(user_id: str, exp: int, reason: str):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="用户不存在")
        
        old_level = user.level
        user.exp += exp
        user.level = (user.exp // 1000) + 1
        level_up = user.level > old_level
        
        db.commit()
        db.refresh(user)
        
        return {
            "user": user,
            "level_up": level_up,
            "from_level": old_level,
            "to_level": user.level
        }
    finally:
        db.close()

@router.get("/ranking/list")
async def get_ranking(limit: int = 10):
    db = SessionLocal()
    try:
        users = db.query(User).order_by(User.exp.desc()).limit(limit).all()
        return [
            {
                "id": u.id,
                "nickname": u.nickname,
                "avatar": u.avatar,
                "level": u.level,
                "exp": u.exp
            }
            for u in users
        ]
    finally:
        db.close()
