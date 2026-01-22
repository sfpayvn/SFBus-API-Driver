import { forwardRef, Module } from '@nestjs/common';
import { DriverBusStationService } from './driver-bus-station.service';
import { DriverBusStationController } from './driver-bus-station.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusStationDocument, BusStationSchema } from '@/module/core/bus/bus-station/schema/bus-station.schema';
import { BusStationModule } from '@/module/core/bus/bus-station/bus-station.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusStationDocument.name, schema: BusStationSchema }]),
    forwardRef(() => BusStationModule),
  ],
  controllers: [DriverBusStationController],
  providers: [DriverBusStationService],
  exports: [DriverBusStationService],
})
export class DriverBusStationModule {}
