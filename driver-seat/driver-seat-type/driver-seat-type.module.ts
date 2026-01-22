import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSeatTypeController } from './driver-seat-type.controller';
import { DriverSeatTypeService } from './driver-seat-type.service';
import { SeatTypeDocument, SeatTypeSchema } from '@/module/core/seat/seat-type/schema/seat-type.schema';
import { SeatTypeModule } from '@/module/core/seat/seat-type/seat-type.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SeatTypeDocument.name, schema: SeatTypeSchema }]),
    forwardRef(() => SeatTypeModule),
  ],
  controllers: [DriverSeatTypeController],
  providers: [DriverSeatTypeService],
  exports: [DriverSeatTypeService],
})
export class DriverSeatTypeModule {}
