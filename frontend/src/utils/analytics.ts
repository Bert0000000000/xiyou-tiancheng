/**
 * 埋点 SDK - 用户行为追踪
 * 支持事件类型：page_view, quest_complete, level_up, achievement_unlock
 */

interface AnalyticsEvent {
  event_type: 'page_view' | 'quest_complete' | 'level_up' | 'achievement_unlock' | 'custom'
  user_id: string
  session_id: string
  timestamp: number
  properties: Record<string, any>
}

class AnalyticsSDK {
  private sessionId: string
  private userId: string | null
  private queue: AnalyticsEvent[] = []
  private endpoint: string = '/api/analytics'

  constructor() {
    this.sessionId = this.generateSessionId()
    this.userId = this.getUserId()
  }

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
  }

  private getUserId(): string | null {
    return localStorage.getItem('user_id')
  }

  setUserId(userId: string) {
    this.userId = userId
    localStorage.setItem('user_id', userId)
  }

  track(event: Omit<AnalyticsEvent, 'session_id' | 'timestamp'>) {
    const analyticsEvent: AnalyticsEvent = {
      ...event,
      session_id: this.sessionId,
      timestamp: Date.now(),
    }

    // 发送到后端（异步，不阻塞）
    this.send(analyticsEvent)

    // 开发环境打印日志
    if (import.meta.env.DEV) {
      console.log('[Analytics]', analyticsEvent)
    }
  }

  private async send(event: AnalyticsEvent) {
    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      })
    } catch (error) {
      // 发送失败时加入队列，稍后重试
      this.queue.push(event)
      console.warn('[Analytics] Send failed, queued for retry:', error)
    }
  }

  // 页面浏览
  trackPageView(page: string, properties?: Record<string, any>) {
    if (!this.userId) return
    this.track({
      event_type: 'page_view',
      user_id: this.userId,
      properties: { page, ...properties },
    })
  }

  // 任务完成
  trackQuestComplete(questId: string, questType: string, exp: number) {
    if (!this.userId) return
    this.track({
      event_type: 'quest_complete',
      user_id: this.userId,
      properties: { quest_id: questId, quest_type: questType, exp },
    })
  }

  // 等级提升
  trackLevelUp(fromLevel: number, toLevel: number) {
    if (!this.userId) return
    this.track({
      event_type: 'level_up',
      user_id: this.userId,
      properties: { from_level: fromLevel, to_level: toLevel },
    })
  }

  // 成就解锁
  trackAchievementUnlock(achievementId: string, achievementName: string) {
    if (!this.userId) return
    this.track({
      event_type: 'achievement_unlock',
      user_id: this.userId,
      properties: { achievement_id: achievementId, achievement_name: achievementName },
    })
  }

  // 重试队列中的事件
  async flushQueue() {
    while (this.queue.length > 0) {
      const event = this.queue.shift()
      if (event) {
        await this.send(event)
      }
    }
  }
}

// 导出单例
export const analytics = new AnalyticsSDK()
