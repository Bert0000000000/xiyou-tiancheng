from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_quests():
    return {"message": "任务系统 API - 待实现"}
