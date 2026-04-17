import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './modules/user/user.module'
import { GrowthModule } from './modules/growth/growth.module'
import { QuestModule } from './modules/quest/quest.module'
import { AnalyticsModule } from './modules/analytics/analytics.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    GrowthModule,
    QuestModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
