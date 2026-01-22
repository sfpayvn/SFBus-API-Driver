import {
  BusLayoutTemplateDocument,
  BusLayoutTemplateSchema,
} from '@/module/core/bus/bus-layout-template/schema/bus-layout-template.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverBusLayoutTemplateController } from './driver-bus-layout-template.controller';
import { DriverBusLayoutTemplateService } from './driver-bus-layout-template.service';
import { BusLayoutTemplateModule } from '@/module/core/bus/bus-layout-template/bus-layout-template.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusLayoutTemplateDocument.name, schema: BusLayoutTemplateSchema }]),
    forwardRef(() => BusLayoutTemplateModule),
  ],
  controllers: [DriverBusLayoutTemplateController],
  providers: [DriverBusLayoutTemplateService],
  exports: [DriverBusLayoutTemplateService],
})
export class DriverBusLayoutTemplateModule {}
