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
          <header style={{ textAlign: 'center', marginBottom: '60px', padding: '40px 0' }}>
            <div className="float" style={{ display: 'inline-block' }}>
              <h1 className="glow-text" style={{ 
                fontSize: '64px', 
                marginBottom: '16px',
                background: 'var(--gradient-1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                🚀 西游天团成长系统
              </h1>
            </div>
            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '20px',
              letterSpacing: '4px',
              textTransform: 'uppercase'
            }}>
              科幻炫技 · 成长进化 · 无限可能
            </p>
            <div style={{ 
              width: '200px', 
              height: '2px', 
              background: 'var(--gradient-1)',
              margin: '30px auto'
            }} />

          {/* 用户信息卡片 */}
          <Card
            className="neon-border card-hover"
            style={{
              background: 'var(--bg-card)',
              backdropFilter: 'blur(10px)',
              marginBottom: '40px',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <h2 style={{ 
                  marginBottom: '12px',
                  fontSize: '28px',
                  background: 'var(--gradient-1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  欢迎，{user?.nickname || '探索者'}
                </h2>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>当前等级</span>
                    <p style={{ fontSize: '24px', color: 'var(--primary-color)', fontWeight: 'bold', margin: 0 }}>
                      LV.{level}
                    </p>
                  </div>
                  <div style={{ width: '200px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>经验值</span>
                    <p style={{ fontSize: '18px', color: 'var(--secondary-color)', margin: '4px 0' }}>
                      {user?.exp || 0} / 1000
                    </p>
                  </div>
                </div>
              </div>
              <Button 
                className="btn-gradient" 
                size="large" 
                onClick={() => navigate('/growth')}
                style={{ borderRadius: '8px', padding: '0 32px' }}
              >
                查看成长路径 →
              </Button>
            </div>
          </Card>

          {/* 功能入口 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <Card
              className="neon-border card-hover"
              hoverable
              style={{
                background: 'var(--bg-card)',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
                padding: '48px 24px',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/quests')}
            >
              <div className="float" style={{ fontSize: '64px', marginBottom: '24px', animationDelay: '0s' }}>🎯</div>
              <h3 style={{ 
                fontSize: '24px', 
                marginBottom: '12px',
                color: 'var(--primary-color)'
              }}>任务中心</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.6' }}>
                完成日常任务，获取丰厚奖励
              </p>
            </Card>

            <Card
              className="neon-border card-hover"
              hoverable
              style={{
                background: 'var(--bg-card)',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
                padding: '48px 24px',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/growth')}
            >
              <div className="float" style={{ fontSize: '64px', marginBottom: '24px', animationDelay: '0.5s' }}>📈</div>
              <h3 style={{ 
                fontSize: '24px', 
                marginBottom: '12px',
                color: 'var(--secondary-color)'
              }}>成长路径</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.6' }}>
                可视化你的成长轨迹
              </p>
            </Card>

            <Card
              className="neon-border card-hover"
              hoverable
              style={{
                background: 'var(--bg-card)',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
                padding: '48px 24px',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/ranking')}
            >
              <div className="float" style={{ fontSize: '64px', marginBottom: '24px', animationDelay: '1s' }}>🏆</div>
              <h3 style={{ 
                fontSize: '24px', 
                marginBottom: '12px',
                color: 'var(--accent-color)'
              }}>排行榜</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.6' }}>
                与全服玩家一较高下
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
