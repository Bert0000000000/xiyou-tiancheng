# 西游天团成长系统 🚀

> 科幻炫技风格的成长系统 · 西游天团队出品

## 项目简介

西游天团是一个科幻风格的成长系统，包含：
- 📈 用户等级体系（经验值、等级、头衔）
- 🎯 任务系统（日常任务、成就任务、挑战任务）
- 💰 积分/货币系统（虚拟货币、商城兑换）
- 🏆 社交互动（排行榜、PK、组队）
- 🎨 可视化成长路径（Three.js 3D 效果）

## 技术栈

### 前端 (frontend/)
- React 18 + TypeScript
- Ant Design 5
- Three.js + @react-three/fiber（3D 效果）
- Zustand（状态管理）
- Vite + Vitest（构建 + 测试）

### 后端 (backend/)
- NestJS + TypeScript
- Prisma（ORM）
- PostgreSQL + Redis
- Swagger（API 文档）

## 快速开始

### 环境要求
- Node.js >= 18
- PostgreSQL >= 14
- Redis >= 6

### 安装依赖

```bash
# 前端
cd frontend
npm install

# 后端
cd backend
npm install
```

### 配置数据库

```bash
cd backend
cp .env.example .env
# 编辑 .env 配置数据库连接
```

### 启动开发环境

```bash
# 启动后端（端口 4000）
cd backend
npm run start:dev

# 启动前端（端口 3000）
cd frontend
npm run dev
```

访问：
- 前端：http://localhost:3000
- 后端 API：http://localhost:4000
- API 文档：http://localhost:4000/api/docs

## 项目结构

```
xiyou-tiancheng/
├── frontend/           # React 前端
│   ├── src/
│   │   ├── components/ # 可复用组件
│   │   ├── pages/      # 页面组件
│   │   ├── store/      # Zustand 状态管理
│   │   ├── utils/      # 工具函数（含埋点 SDK）
│   │   └── styles/     # 全局样式
│   └── package.json
├── backend/            # NestJS 后端
│   ├── src/
│   │   └── modules/    # 功能模块
│   │       ├── user/       # 用户模块
│   │       ├── growth/     # 成长模块
│   │       ├── quest/      # 任务模块
│   │       └── analytics/  # 埋点模块
│   └── prisma/
│       └── schema.prisma   # 数据库 Schema
└── docs/               # 项目文档
```

## 核心功能

### 用户系统
- 用户注册/登录
- 经验值获取
- 等级晋升
- 个人资料

### 成长系统
- 成长记录追踪
- 等级进度可视化
- 成就解锁

### 任务系统
- 日常任务
- 成就任务
- 挑战任务
- 任务进度追踪

### 埋点系统
- 页面浏览追踪
- 任务完成事件
- 等级提升事件
- 成就解锁事件

## 开发规范

- 代码风格：ESLint + Prettier
- 提交规范：Conventional Commits
- 测试覆盖：核心模块 80%+

## 团队成员

- 🐵 孙悟空 - 架构设计
- 🐷 猪八戒 - 全栈开发 & 测试
- 🧔 沙和尚 - 运营 & 监控
- 🐴 白龙马 - GTM
- 🧙 唐僧 - 产品规划

## 文档

- [产品规划](./docs/西游天团成长系统/01-产品规划.md)
- [架构设计](./docs/西游天团成长系统/02-架构设计.md)

---

_代码即艺术，质量即生命_ 🚀
