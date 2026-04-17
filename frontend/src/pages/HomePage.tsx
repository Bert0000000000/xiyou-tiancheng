import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Button, Card } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/userStore'

// 3D 科技感背景组件
function TechBackground() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
    </>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const { user, level } = useUserStore()

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* 3D 背景 */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <TechBackground />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* 内容层 */}
      <div style={{ position: 'relative', zIndex: 1, padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* 头部 */}
          <header style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 className="glow-text" style={{ fontSize: '48px', marginBottom: '16px' }}>
              🚀 西游天团成长系统
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>
              科幻炫技 · 成长进化 · 无限可能
            </p>
          </header>

          {/* 用户信息卡片 */}
          <Card
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              marginBottom: '40px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ marginBottom: '8px' }}>欢迎，{user?.nickname || '探索者'}</h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  当前等级：LV.{level} | 经验值：{user?.exp || 0}/1000
                </p>
              </div>
              <Button type="primary" size="large" onClick={() => navigate('/growth')}>
                查看成长路径
              </Button>
            </div>
          </Card>

          {/* 功能入口 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <Card
              hoverable
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                textAlign: 'center',
                padding: '40px 20px',
              }}
              onClick={() => navigate('/quests')}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
              <h3>任务中心</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                完成日常任务，获取丰厚奖励
              </p>
            </Card>

            <Card
              hoverable
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                textAlign: 'center',
                padding: '40px 20px',
              }}
              onClick={() => navigate('/growth')}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📈</div>
              <h3>成长路径</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                可视化你的成长轨迹
              </p>
            </Card>

            <Card
              hoverable
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                textAlign: 'center',
                padding: '40px 20px',
              }}
              onClick={() => navigate('/ranking')}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏆</div>
              <h3>排行榜</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                与全服玩家一较高下
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
