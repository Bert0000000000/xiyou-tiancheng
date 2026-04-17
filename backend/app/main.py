from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import users, growth, quests, analytics

app = FastAPI(
    title="西游天团成长系统 API",
    description="科幻炫技风格的成长系统后端接口",
    version="1.0.0"
)

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 路由注册
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(growth.router, prefix="/api/growth", tags=["growth"])
app.include_router(quests.router, prefix="/api/quests", tags=["quests"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])

@app.get("/")
async def root():
    return {"message": "西游天团成长系统 API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
