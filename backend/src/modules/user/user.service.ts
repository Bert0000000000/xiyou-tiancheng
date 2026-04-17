import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface CreateUserDto {
  nickname: string
  avatar?: string
  email?: string
}

@Injectable()
export class UserService {
  async create(data: CreateUserDto) {
    const user = await prisma.user.create({
      data: {
        ...data,
        exp: 0,
        level: 1,
      },
    })
    return user
  }

  async findAll() {
    return prisma.user.findMany({
      orderBy: { exp: 'desc' },
      take: 100,
    })
  }

  async findOne(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        growthLogs: { orderBy: { createdAt: 'desc' }, take: 10 },
        userQuests: { include: { quest: true } },
        achievements: { include: { achievement: true } },
      },
    })

    if (!user) {
      throw new NotFoundException(`用户 ${id} 不存在`)
    }

    return user
  }

  async addExp(userId: string, exp: number, reason: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException(`用户 ${userId} 不存在`)
    }

    const newExp = user.exp + exp
    const newLevel = Math.floor(newExp / 1000) + 1
    const levelUp = newLevel > user.level

    // 更新用户经验值和等级
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        exp: newExp,
        level: newLevel,
      },
    })

    // 记录成长日志
    await prisma.growthLog.create({
      data: {
        userId,
        expChange: exp,
        fromLevel: user.level,
        toLevel: newLevel,
        reason,
      },
    })

    return {
      user: updatedUser,
      levelUp,
      fromLevel: user.level,
      toLevel: newLevel,
    }
  }

  async getRanking(limit: number = 10) {
    return prisma.user.findMany({
      orderBy: { exp: 'desc' },
      take: limit,
      select: {
        id: true,
        nickname: true,
        avatar: true,
        level: true,
        exp: true,
      },
    })
  }
}
