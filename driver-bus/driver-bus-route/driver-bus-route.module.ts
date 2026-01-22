import { BusRouteDocument, BusRouteSchema } from '@/module/core/bus/bus-route/schema/bus-route.schema';
import { forwardRef, Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { DriverBusRouteController } from './driver-bus-route.controller';
import { DriverBusRouteService } from './driver-bus-route.service';
import { BusRouteModule } from '@/module/core/bus/bus-route/bus-route.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusRouteDocument.name, schema: BusRouteSchema }]),
    forwardRef(() => BusRouteModule),
  ],
  controllers: [DriverBusRouteController],
  providers: [DriverBusRouteService],
  exports: [DriverBusRouteService],
})
export class DriverBusRouteModule {}
