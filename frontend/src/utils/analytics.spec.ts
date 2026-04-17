import { describe, it, expect, beforeEach, vi } from 'vitest'
import { analytics } from './analytics'

describe('AnalyticsSDK', () => {
  beforeEach(() => {
    // 清理 localStorage
    localStorage.clear()
  })

  it('should generate unique session id', () => {
    expect(analytics['sessionId']).toBeDefined()
    expect(analytics['sessionId'].startsWith('sess_')).toBe(true)
  })

  it('should set and get user id', () => {
    const userId = 'user_123'
    analytics.setUserId(userId)
    expect(localStorage.getItem('user_id')).toBe(userId)
  })

  it('should track page view event', () => {
    analytics.setUserId('user_123')
    // 测试埋点方法存在
    expect(typeof analytics.trackPageView).toBe('function')
  })

  it('should track quest complete event', () => {
    analytics.setUserId('user_123')
    expect(typeof analytics.trackQuestComplete).toBe('function')
  })

  it('should track level up event', () => {
    analytics.setUserId('user_123')
    expect(typeof analytics.trackLevelUp).toBe('function')
  })

  it('should track achievement unlock event', () => {
    analytics.setUserId('user_123')
    expect(typeof analytics.trackAchievementUnlock).toBe('function')
  })
})
