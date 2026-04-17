import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { UserService } from '../user/user.service'

const prisma = new PrismaClient()

@Injectable()
export class GrowthService {
  constructor(private readonly userService: UserService) {}

  async getGrowthLogs(userId: string, limit: number = 20) {
    return prisma.growthLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })
  }

  async getUserProgress(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        growthLogs: { orderBy: { createdAt: 'desc' }, take: 1 },
        userQuests: {
          include: { quest: true },
          where: { status: 'COMPLETED' },
        },
        achievements: {
          include: { achievement: true },
        },
      },
    })

    if (!user) {
      return null
    }

    // 计算进度统计
    const totalQuests = await prisma.quest.count()
    const completedQuests = user.userQuests.length
    const totalAchievements = await prisma.achievement.count()
    const unlockedAchievements = user.achievements.length

    return {
      user: {
        id: user.id,
        nickname: user.nickname,
        avatar: user.avatar,
        level: user.level,
        exp: user.exp,
      },
      stats: {
        completedQuests,
        totalQuests,
        unlockedAchievements,
        totalAchievements,
      },
      recentGrowth: user.growthLogs[0] || null,
    }
  }
}
