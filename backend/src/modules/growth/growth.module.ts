import { Module } from '@nestjs/common'
import { GrowthService } from './growth.service'
import { GrowthController } from './growth.controller'
import { UserModule } from '../user/user.module'

@Module({
  imports: [UserModule],
  controllers: [GrowthController],
  providers: [GrowthService],
  exports: [GrowthService],
})
export class GrowthModule {}
