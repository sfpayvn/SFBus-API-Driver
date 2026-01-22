import { MongooseModule } from '@nestjs/mongoose';
import { DriverBusTypeController } from './driver-bus-type.controller';
import { DriverBusTypeService } from './driver-bus-type.service';
import { BusTypeDocument, BusTypeSchema } from '@/module/core/bus/bus-type/schema/bus-type.schema';
import { forwardRef, Module } from '@nestjs/common';
import { BusTypeModule } from '@/module/core/bus/bus-type/bus-type.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusTypeDocument.name, schema: BusTypeSchema }]),
    forwardRef(() => BusTypeModule),
  ],
  controllers: [DriverBusTypeController],
  providers: [DriverBusTypeService],
  exports: [DriverBusTypeService],
})
export class DriverBusTypeModule {}
