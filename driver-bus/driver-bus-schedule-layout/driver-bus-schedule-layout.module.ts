import {
  BusScheduleLayoutDocument,
  BusScheduleLayoutSchema,
} from '@/module/core/bus/bus-schedule-layout/schema/bus-schedule-layout.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverBusScheduleLayoutController } from './driver-bus-schedule-layout.controller';
import { DriverBusScheduleLayoutService } from './driver-bus-schedule-layout.service';
import { BusScheduleLayoutModule } from '@/module/core/bus/bus-schedule-layout/bus-schedule-layout.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusScheduleLayoutDocument.name, schema: BusScheduleLayoutSchema }]),
    forwardRef(() => BusScheduleLayoutModule),
  ],
  controllers: [DriverBusScheduleLayoutController],
  providers: [DriverBusScheduleLayoutService],
  exports: [DriverBusScheduleLayoutService],
})
export class DriverBusScheduleLayoutModule {}
