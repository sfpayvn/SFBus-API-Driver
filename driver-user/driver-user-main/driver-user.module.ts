// user.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { DriverUserController } from './driver-user.controller';
import { DriverUserService } from './driver-user.service';
import { UserModule } from '@/module/core/user/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [DriverUserService],
  controllers: [DriverUserController],
  exports: [DriverUserService],
})
export class DriverUserModule {}
