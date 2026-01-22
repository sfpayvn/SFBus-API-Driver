import { BusProvinceDocument, BusProvinceSchema } from '@/module/core/bus/bus-province/schema/bus-schema.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverBusProvinceController } from './driver-bus-province.controller';
import { DriverBusProvinceService } from './driver-bus-province.service';
import { BusProvinceModule } from '@/module/core/bus/bus-province/bus-province.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusProvinceDocument.name, schema: BusProvinceSchema }]),
    forwardRef(() => BusProvinceModule),
  ],
  controllers: [DriverBusProvinceController],
  providers: [DriverBusProvinceService],
  exports: [DriverBusProvinceService],
})
export class DriverBusProvinceModule {}
