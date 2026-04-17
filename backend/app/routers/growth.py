from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_growth_logs():
    return {"message": "成长记录 API - 待实现"}
