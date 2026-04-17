import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaClient, QuestType, QuestStatus } from '@prisma/client'
import { UserService } from '../user/user.service'

const prisma = new PrismaClient()

export interface CreateQuestDto {
  title: string
  description: string
  type: QuestType
  expReward: number
}

@Injectable()
export class QuestService {
  constructor(private readonly userService: UserService) {}

  async create(data: CreateQuestDto) {
    return prisma.quest.create({ data })
  }

  async findAll(type?: QuestType) {
    const where = type ? { type } : {}
    return prisma.quest.findMany({ where, include: { userQuests: true } })
  }

  async findOne(id: string) {
    const quest = await prisma.quest.findUnique({
      where: { id },
      include: { userQuests: true },
    })

    if (!quest) {
      throw new NotFoundException(`任务 ${id} 不存在`)
    }

    return quest
  }

  async acceptQuest(userId: string, questId: string) {
    const quest = await prisma.quest.findUnique({ where: { id: questId } })
    if (!quest) {
      throw new NotFoundException(`任务 ${questId} 不存在`)
    }

    // 检查是否已接受
    const existing = await prisma.userQuest.findUnique({
      where: { userId_questId: { userId, questId } },
    })

    if (existing) {
      return existing
    }

    return prisma.userQuest.create({
      data: {
        userId,
        questId,
        status: QuestStatus.IN_PROGRESS,
        progress: 0,
        total: 1,
      },
      include: { quest: true },
    })
  }

  async completeQuest(userId: string, questId: string) {
    const userQuest = await prisma.userQuest.findUnique({
      where: { userId_questId: { userId, questId } },
      include: { quest: true },
    })

    if (!userQuest) {
      throw new NotFoundException(`用户任务记录不存在`)
    }

    if (userQuest.status === QuestStatus.COMPLETED) {
      return { message: '任务已完成', rewarded: false }
    }

    // 更新任务状态
    await prisma.userQuest.update({
      where: { id: userQuest.id },
      data: {
        status: QuestStatus.COMPLETED,
        progress: userQuest.quest.type === QuestType.DAILY ? 1 : userQuest.total,
        completedAt: new Date(),
      },
    })

    // 增加经验值
    const result = await this.userService.addExp(
      userId,
      userQuest.quest.expReward,
      `quest_complete:${questId}`,
    )

    return {
      message: '任务完成',
      rewarded: true,
      expGained: userQuest.quest.expReward,
      levelUp: result.levelUp,
      fromLevel: result.fromLevel,
      toLevel: result.toLevel,
    }
  }

  async getUserQuests(userId: string, status?: QuestStatus) {
    const where: any = { userId }
    if (status) {
      where.status = status
    }

    return prisma.userQuest.findMany({
      where,
      include: { quest: true },
      orderBy: { updatedAt: 'desc' },
    })
  }
}
