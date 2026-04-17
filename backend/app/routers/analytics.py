from fastapi import APIRouter

router = APIRouter()

@router.post("/")
async def track_event():
    return {"message": "埋点事件 API - 待实现"}
