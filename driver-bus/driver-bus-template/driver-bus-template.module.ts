import { BusServiceModule } from '@/module/core/bus/bus-service/bus-service.module';
import { BusTemplateDocument, BusTemplateSchema } from '@/module/core/bus/bus-template/schema/bus-template.schema';
import { BusTypeModule } from '@/module/core/bus/bus-type/bus-type.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverBusTemplateController } from './driver-bus-template.controller';
import { DriverBusTemplateService } from './driver-bus-template.service';
import { DriverBusTypeModule } from '../driver-bus-type/driver-bus-type.module';
import { DriverBusServiceModule } from '../driver-bus-service/driver-bus-service.module';
import { BusTemplateModule } from '@/module/core/bus/bus-template/bus-template.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusTemplateDocument.name, schema: BusTemplateSchema }]),
    forwardRef(() => DriverBusServiceModule),
    forwardRef(() => DriverBusTypeModule),
    forwardRef(() => BusTemplateModule),
  ],
  controllers: [DriverBusTemplateController],
  providers: [DriverBusTemplateService],
  exports: [DriverBusTemplateService],
})
export class DriverBusTemplateModule {}
