from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

from app.core.config import settings

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, index=True)
    nickname = Column(String, index=True)
    avatar = Column(String, nullable=True)
    email = Column(String, unique=True, nullable=True)
    exp = Column(Integer, default=0)
    level = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    growth_logs = relationship("GrowthLog", back_populates="user")
    user_quests = relationship("UserQuest", back_populates="user")
    analytics_events = relationship("AnalyticsEvent", back_populates="user")

class GrowthLog(Base):
    __tablename__ = "growth_logs"
    
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), index=True)
    exp_change = Column(Integer)
    from_level = Column(Integer)
    to_level = Column(Integer)
    reason = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="growth_logs")

class Quest(Base):
    __tablename__ = "quests"
    
    id = Column(String, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    type = Column(String)  # daily, achievement, challenge
    exp_reward = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class UserQuest(Base):
    __tablename__ = "user_quests"
    
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), index=True)
    quest_id = Column(String, ForeignKey("quests.id"))
    status = Column(String, default="pending")  # pending, in_progress, completed
    progress = Column(Integer, default=0)
    total = Column(Integer, default=1)
    completed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="user_quests")
    quest = relationship("Quest")

class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"
    
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), index=True)
    session_id = Column(String)
    event_type = Column(String, index=True)
    properties = Column(JSON, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="analytics_events")
