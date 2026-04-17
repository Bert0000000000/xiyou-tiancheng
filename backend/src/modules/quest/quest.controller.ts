import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { QuestService, CreateQuestDto } from './quest.service'
import { QuestType, QuestStatus } from '@prisma/client'

@ApiTags('quests')
@Controller('quests')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @Post()
  @ApiOperation({ summary: '创建任务' })
  create(@Body() createDto: CreateQuestDto) {
    return this.questService.create(createDto)
  }

  @Get()
  @ApiOperation({ summary: '获取任务列表' })
  findAll(@Query('type') type?: QuestType) {
    return this.questService.findAll(type)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取任务详情' })
  findOne(@Param('id') id: string) {
    return this.questService.findOne(id)
  }

  @Post(':id/accept')
  @ApiOperation({ summary: '接受任务' })
  acceptQuest(@Param('id') id: string, @Body() body: { userId: string }) {
    return this.questService.acceptQuest(body.userId, id)
  }

  @Post(':id/complete')
  @ApiOperation({ summary: '完成任务' })
  completeQuest(@Param('id') id: string, @Body() body: { userId: string }) {
    return this.questService.completeQuest(body.userId, id)
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '获取用户任务列表' })
  getUserQuests(
    @Param('userId') userId: string,
    @Query('status') status?: QuestStatus,
  ) {
    return this.questService.getUserQuests(userId, status)
  }
}
