import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { UserService, CreateUserDto } from './user.service'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '创建用户' })
  @ApiResponse({ status: 201, description: '用户创建成功' })
  create(@Body() createDto: CreateUserDto) {
    return this.userService.create(createDto)
  }

  @Get()
  @ApiOperation({ summary: '获取用户列表' })
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: '获取用户详情' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Post(':id/exp')
  @ApiOperation({ summary: '增加用户经验值' })
  addExp(
    @Param('id') id: string,
    @Body() body: { exp: number; reason: string },
  ) {
    return this.userService.addExp(id, body.exp, body.reason)
  }

  @Get('ranking/list')
  @ApiOperation({ summary: '获取排行榜' })
  getRanking(@Query('limit') limit?: number) {
    return this.userService.getRanking(limit ? parseInt(limit) : 10)
  }
}
