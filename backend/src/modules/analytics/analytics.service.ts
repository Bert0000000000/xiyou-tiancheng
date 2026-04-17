import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface AnalyticsEventDto {
  event_type: string
  user_id: string
  session_id: string
  timestamp: number
  properties?: Record<string, any>
}

@Injectable()
export class AnalyticsService {
  async trackEvent(data: AnalyticsEventDto) {
    return prisma.analyticsEvent.create({
      data: {
        userId: data.user_id,
        sessionId: data.session_id,
        eventType: data.event_type,
        properties: data.properties || {},
        timestamp: new Date(data.timestamp),
      },
    })
  }

  async getUserEvents(userId: string, limit: number = 50) {
    return prisma.analyticsEvent.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      take: limit,
    })
  }

  async getEventStats(eventType: string, startDate?: Date, endDate?: Date) {
    const where: any = { eventType }
    if (startDate || endDate) {
      where.timestamp = {}
      if (startDate) where.timestamp.gte = startDate
      if (endDate) where.timestamp.lte = endDate
    }

    const total = await prisma.analyticsEvent.count({ where })
    const uniqueUsers = await prisma.analyticsEvent.groupBy({
      by: ['userId'],
      where,
    })

    return {
      total,
      uniqueUsers: uniqueUsers.length,
    }
  }
}
