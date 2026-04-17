import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 启用 CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  })

  // 全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  // Swagger 文档
  const config = new DocumentBuilder()
    .setTitle('西游天团成长系统 API')
    .setDescription('科幻炫技风格的成长系统后端接口')
    .setVersion('1.0')
    .addTag('users', '用户管理')
    .addTag('growth', '成长系统')
    .addTag('quests', '任务系统')
    .addTag('analytics', '埋点数据')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  const port = process.env.PORT || 4000
  await app.listen(port)
  console.log(`🚀 应用运行在：http://localhost:${port}`)
  console.log(`📚 API 文档：http://localhost:${port}/api/docs`)
}

bootstrap()
