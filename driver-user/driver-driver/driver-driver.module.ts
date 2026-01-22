// driver.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverDriverService } from './driver-driver.service';
import { DriverDriverController } from './driver-driver.controller';
import { DriverUserModule } from '../driver-user-main/driver-user.module';
import { DriverDocument, DriverSchema } from '@/module/core/user/driver/schema/driver.schema';
import { DriverModule } from '@/module/core/user/driver/driver.module';

@Module({
  imports: [
    forwardRef(() => DriverModule),
    forwardRef(() => DriverUserModule),
    MongooseModule.forFeature([{ name: DriverDocument.name, schema: DriverSchema }]),
  ],
  providers: [DriverDriverService],
  controllers: [DriverDriverController],
  exports: [DriverDriverService],
})
export class DriverDriverModule {}
