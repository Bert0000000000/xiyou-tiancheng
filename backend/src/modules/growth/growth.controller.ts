import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { GrowthService } from './growth.service'

@ApiTags('growth')
@Controller('growth')
export class GrowthController {
  constructor(private readonly growthService: GrowthService) {}

  @Get(':userId/logs')
  @ApiOperation({ summary: '获取用户成长记录' })
  getGrowthLogs(@Param('userId') userId: string, @Query('limit') limit?: number) {
    return this.growthService.getGrowthLogs(userId, limit ? parseInt(limit) : 20)
  }

  @Get(':userId/progress')
  @ApiOperation({ summary: '获取用户成长进度' })
  getUserProgress(@Param('userId') userId: string) {
    return this.growthService.getUserProgress(userId)
  }
}
