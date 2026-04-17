# 西游天团成长系统 - Python 后端

## 技术栈
- FastAPI 0.109.0
- SQLAlchemy 2.0.25
- PostgreSQL + Redis
- Pydantic 2.5.3

## 安装依赖
```bash
pip install -r requirements.txt
```

## 启动开发服务器
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 4000
```

## API 文档
启动后访问：http://localhost:4000/docs

## 项目结构
```
backend/
├── app/
│   ├── main.py              # FastAPI 应用入口
│   ├── models.py            # SQLAlchemy 数据模型
│   ├── core/
│   │   └── config.py        # 配置管理
│   └── routers/
│       ├── users.py         # 用户管理 API
│       ├── growth.py        # 成长系统 API
│       ├── quests.py        # 任务系统 API
│       └── analytics.py     # 埋点 API
└── requirements.txt         # Python 依赖
```

## 核心 API
- POST /api/users/ - 创建用户
- GET /api/users/ - 获取用户列表
- GET /api/users/{user_id} - 获取用户详情
- POST /api/users/{user_id}/exp - 增加经验值
- GET /api/users/ranking/list - 获取排行榜

## 测试
```bash
pytest
```
