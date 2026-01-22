import { BookingDocument, BookingSchema } from '@/module/core/booking/schema/booking.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverBookingController } from './driver-booking.controller';
import { DriverBookingService } from './driver-booking-service';
import { DriverBookingGateway } from './driver-booking.gateway';
import { BookingModule } from '@/module/core/booking/booking.module';
import { DriverPaymentModule } from '../driver-payment/driver-payment.module';
import { DriverTrackingModule } from '../driver-tracking/driver-tracking.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookingDocument.name, schema: BookingSchema }]),
    forwardRef(() => BookingModule),
    forwardRef(() => DriverPaymentModule),
    DriverTrackingModule,
  ],
  controllers: [DriverBookingController],
  providers: [DriverBookingService, DriverBookingGateway],
  exports: [DriverBookingService],
})
export class DriverBookingModule {}
