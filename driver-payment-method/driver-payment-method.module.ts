import { forwardRef, Module } from '@nestjs/common';
import { DriverPaymentMethodController } from './driver-payment-method.controller';
import { DriverPaymentMethodService } from './driver-payment-method-service';
import { PaymentMethodModule } from '@/module/core/payment-method/payment-method.module';

@Module({
  imports: [forwardRef(() => PaymentMethodModule)],
  controllers: [DriverPaymentMethodController],
  providers: [DriverPaymentMethodService],
  exports: [DriverPaymentMethodService],
})
export class DriverPaymentMethodModule {}
