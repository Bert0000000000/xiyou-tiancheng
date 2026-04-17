import { Card, Table, Avatar } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface RankingItem {
  rank: number
  userId: string
  nickname: string
  avatar: string
  level: number
  exp: number
}

const mockRanking: RankingItem[] = [
  { rank: 1, userId: '1', nickname: '孙悟空', avatar: '🐵', level: 99, exp: 99999 },
  { rank: 2, userId: '2', nickname: '唐僧', avatar: '🧙', level: 85, exp: 85000 },
  { rank: 3, userId: '3', nickname: '猪八戒', avatar: '🐷', level: 72, exp: 72000 },
  { rank: 4, userId: '4', nickname: '沙和尚', avatar: '🧔', level: 68, exp: 68000 },
  { rank: 5, userId: '5', nickname: '白龙马', avatar: '🐴', level: 65, exp: 65000 },
]

export default function RankingPage() {
  const columns: ColumnsType<RankingItem> = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      render: (rank: number) => {
        const colors = ['#ffd700', '#c0c0c0', '#cd7f32']
        return (
          <span
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: colors[rank - 1] || 'var(--text-primary)',
            }}
          >
            {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `#${rank}`}
          </span>
        )
      },
    },
    {
      title: '用户',
      dataIndex: 'nickname',
      key: 'nickname',
      render: (_: string, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar size={40} style={{ background: 'var(--border-color)', fontSize: '20px' }}>
            {record.avatar}
          </Avatar>
          <span>{record.nickname}</span>
        </div>
      ),
    },
    {
      title: '等级',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      render: (level: number) => <span style={{ color: 'var(--primary-color)' }}>LV.{level}</span>,
    },
    {
      title: '经验值',
      dataIndex: 'exp',
      key: 'exp',
      width: 120,
      render: (exp: number) => exp.toLocaleString(),
    },
  ]

  return (
    <div style={{ padding: '40px 20px', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 头部 */}
        <header style={{ marginBottom: '40px' }}>
          <h1 className="glow-text" style={{ fontSize: '36px', marginBottom: '16px' }}>
            🏆 排行榜
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>与全服玩家一较高下</p>
        </header>

        {/* 排行榜表格 */}
        <Card
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
          }}
        >
          <Table
            columns={columns}
            dataSource={mockRanking}
            rowKey="userId"
            pagination={false}
            style={{ background: 'transparent' }}
          />
        </Card>
      </div>
    </div>
  )
}
