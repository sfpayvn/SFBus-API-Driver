import { BusServiceDocument, BusServiceSchema } from '@/module/core/bus/bus-service/schema/bus-service.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverBusServiceController } from './driver-bus-service.controller';
import { DriverBusServiceService } from './driver-bus-service.service';
import { BusServiceModule } from '@/module/core/bus/bus-service/bus-service.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusServiceDocument.name, schema: BusServiceSchema }]),
    forwardRef(() => BusServiceModule),
  ],
  controllers: [DriverBusServiceController],
  providers: [DriverBusServiceService],
  exports: [DriverBusServiceService],
})
export class DriverBusServiceModule {}
