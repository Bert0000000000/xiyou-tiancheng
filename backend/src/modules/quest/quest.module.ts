import { Module } from '@nestjs/common'
import { QuestService } from './quest.service'
import { QuestController } from './quest.controller'
import { UserModule } from '../user/user.module'

@Module({
  imports: [UserModule],
  controllers: [QuestController],
  providers: [QuestService],
  exports: [QuestService],
})
export class QuestModule {}
