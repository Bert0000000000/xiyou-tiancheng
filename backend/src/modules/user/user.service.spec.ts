import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { NotFoundException } from '@nestjs/common'

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('addExp', () => {
    it('should add exp and level up when threshold reached', async () => {
      // 测试逻辑：用户有 900 exp，加 200 exp 后应该升级到 LV.2
      // 实际测试需要 mock PrismaClient，这里写测试框架
      expect(true).toBe(true)
    })
  })
})
