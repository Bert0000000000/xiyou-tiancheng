import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { AnalyticsService, AnalyticsEventDto } from './analytics.service'

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post()
  @ApiOperation({ summary: '上报埋点事件' })
  trackEvent(@Body() eventDto: AnalyticsEventDto) {
    return this.analyticsService.trackEvent(eventDto)
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '获取用户事件列表' })
  getUserEvents(@Param('userId') userId: string, @Query('limit') limit?: number) {
    return this.analyticsService.getUserEvents(userId, limit ? parseInt(limit) : 50)
  }

  @Get('stats/:eventType')
  @ApiOperation({ summary: '获取事件统计' })
  getEventStats(
    @Param('eventType') eventType: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.analyticsService.getEventStats(
      eventType,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    )
  }
}
