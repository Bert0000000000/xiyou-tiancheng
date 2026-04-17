import { Card, Tag, Button, Progress } from 'antd'
import { useNavigate } from 'react-router-dom'

interface Quest {
  id: string
  title: string
  description: string
  type: 'daily' | 'achievement' | 'challenge'
  exp: number
  status: 'pending' | 'completed'
  progress: number
  total: number
}

const mockQuests: Quest[] = [
  {
    id: '1',
    title: '每日签到',
    description: '完成每日签到，获取基础经验值',
    type: 'daily',
    exp: 100,
    status: 'pending',
    progress: 0,
    total: 1,
  },
  {
    id: '2',
    title: '首次任务',
    description: '完成第一个挑战任务',
    type: 'achievement',
    exp: 500,
    status: 'pending',
    progress: 0,
    total: 1,
  },
  {
    id: '3',
    title: '等级突破',
    description: '达到等级 5',
    type: 'challenge',
    exp: 1000,
    status: 'pending',
    progress: 1,
    total: 5,
  },
]

export default function QuestPage() {
  const navigate = useNavigate()

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily':
        return '#00b96b'
      case 'achievement':
        return '#00d4ff'
      case 'challenge':
        return '#9069ff'
      default:
        return '#a0a0b0'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'daily':
        return '日常'
      case 'achievement':
        return '成就'
      case 'challenge':
        return '挑战'
      default:
        return type
    }
  }

  return (
    <div style={{ padding: '40px 20px', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 头部 */}
        <header style={{ marginBottom: '40px' }}>
          <h1 className="glow-text" style={{ fontSize: '36px', marginBottom: '16px' }}>
            🎯 任务中心
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>完成任务，获取经验值和奖励</p>
        </header>

        {/* 任务列表 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {mockQuests.map((quest) => (
            <Card
              key={quest.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0 }}>{quest.title}</h3>
                    <Tag color={getTypeColor(quest.type)}>{getTypeLabel(quest.type)}</Tag>
                    {quest.status === 'completed' && <Tag color="success">已完成</Tag>}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{quest.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Progress
                      percent={(quest.progress / quest.total) * 100}
                      strokeColor={getTypeColor(quest.type)}
                      trailColor="var(--border-color)"
                      format={() => `${quest.progress}/${quest.total}`}
                      style={{ width: '200px' }}
                    />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                      +{quest.exp} EXP
                    </span>
                  </div>
                </div>
                {quest.status === 'pending' && (
                  <Button type="primary" style={{ marginLeft: '24px' }}>
                    前往完成
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
