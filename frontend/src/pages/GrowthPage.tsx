import { Card, Progress, Timeline } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/userStore'

export default function GrowthPage() {
  const navigate = useNavigate()
  const { user, level } = useUserStore()

  const expProgress = ((user?.exp || 0) / 1000) * 100

  return (
    <div style={{ padding: '40px 20px', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 头部 */}
        <header style={{ marginBottom: '40px' }}>
          <h1 className="glow-text" style={{ fontSize: '36px', marginBottom: '16px' }}>
            📈 成长路径
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>追踪你的每一次进步</p>
        </header>

        {/* 等级信息 */}
        <Card
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            marginBottom: '24px',
          }}
        >
          <h2 style={{ marginBottom: '24px' }}>当前等级：LV.{level}</h2>
          <Progress
            percent={expProgress}
            strokeColor={{ '0%': '#00b96b', '100%': '#00d4ff' }}
            trailColor="var(--border-color)"
            format={() => `${user?.exp || 0}/1000 EXP`}
          />
        </Card>

        {/* 成长时间线 */}
        <Card
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
          }}
        >
          <h3 style={{ marginBottom: '24px' }}>成长记录</h3>
          <Timeline
            items={[
              {
                color: '#00b96b',
                children: (
                  <div>
                    <p style={{ color: 'var(--text-primary)' }}>达到等级 {level}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>刚刚</p>
                  </div>
                ),
              },
              {
                color: '#00d4ff',
                children: (
                  <div>
                    <p style={{ color: 'var(--text-primary)' }}>完成新手任务</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>2026-04-17</p>
                  </div>
                ),
              },
              {
                color: '#9069ff',
                children: (
                  <div>
                    <p style={{ color: 'var(--text-primary)' }}>注册西游天团</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>2026-04-17</p>
                  </div>
                ),
              },
            ]}
          />
        </Card>
      </div>
    </div>
  )
}
