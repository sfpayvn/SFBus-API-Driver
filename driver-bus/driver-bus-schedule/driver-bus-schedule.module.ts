import { BusScheduleDocument, BusScheduleSchema } from '@/module/core/bus/bus-schedule/schema/bus-schedule.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverBusScheduleController } from './driver-bus-schedule.controller';
import { DriverBusScheduleService } from './driver-bus-schedule.service';
import { BusScheduleModule } from '@/module/core/bus/bus-schedule/bus-schedule.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusScheduleDocument.name, schema: BusScheduleSchema }]),
    forwardRef(() => BusScheduleModule),
  ],
  controllers: [DriverBusScheduleController],
  providers: [DriverBusScheduleService],
  exports: [DriverBusScheduleService],
})
export class DriverBusScheduleModule {}
