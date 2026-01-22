import { PaymentDocument, PaymentSchema } from '@/module/core/payment/schema/payment.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverPaymentService } from './driver-payment-service';
import { DriverPaymentController } from './driver-payment.controller';
import { PaymentModule } from '@/module/core/payment/payment.module';
import { DriverTrackingModule } from '../driver-tracking/driver-tracking.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PaymentDocument.name, schema: PaymentSchema }]),
    forwardRef(() => PaymentModule),
    DriverTrackingModule,
  ],
  controllers: [DriverPaymentController],
  providers: [DriverPaymentService],
  exports: [DriverPaymentService],
})
export class DriverPaymentModule {}
