import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { DriverPaymentDto, DriverRequestPaymentDto } from './dto/driver-payment.dto';
import { PaymentService } from '@/module/core/payment/payment-service';
import { DriverTrackingService } from '../driver-tracking/driver-tracking.service';
import { TRACKING_TYPES } from '@/module/core/tracking/constants/tracking-types';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Injectable()
export class DriverPaymentService {
  constructor(
    @Inject(forwardRef(() => PaymentService)) private readonly paymentService: PaymentService,
    private readonly driverTrackingService: DriverTrackingService,
  ) {}

  async processBookingPayment(
    driverRequestPaymentDto: DriverRequestPaymentDto,
    tenantId: Types.ObjectId,
    createdBy: Types.ObjectId,
  ): Promise<DriverPaymentDto[]> {
    const payments = await this.paymentService.processBookingPayment(driverRequestPaymentDto, tenantId);

    for (const payment of payments) {
      // Cập nhật trạng thái booking tương ứng

      await this.driverTrackingService.create(
        {
          type: TRACKING_TYPES.PAYMENT_BOOKING_PROCESSED,
          platform: ROLE_CONSTANTS.DRIVER,
          metadata: {
            bookingId: payment.referrentId,
            paymentId: payment._id,
            paymentStatus: payment.status,
            paymentMethodId: payment.paymentMethodId,
            chargedAmount: payment.chargedAmount,
            paymentAmount: payment.paymentAmount,
          },
          createdBy,
        },
        tenantId,
      );
    }
    return payments;
  }

  async processGoodsPayment(
    driverRequestPaymentDto: DriverRequestPaymentDto,
    tenantId: Types.ObjectId,
    createdBy: Types.ObjectId,
  ): Promise<DriverPaymentDto> {
    const payment = await this.paymentService.processGoodsPayment(driverRequestPaymentDto, tenantId, createdBy);
    await this.driverTrackingService.create(
      {
        type: TRACKING_TYPES.PAYMENT_GOODS_PROCESSED,
        platform: ROLE_CONSTANTS.DRIVER,
        metadata: {
          goodsId: payment.referrentId,
          paymentId: payment._id,
          paymentStatus: payment.status,
          paymentMethodId: payment.paymentMethodId,
          chargedAmount: payment.chargedAmount,
          paymentAmount: payment.paymentAmount,
        },
        createdBy,
      },
      tenantId,
    );

    return payment;
  }

  async findAllByReferrentId(referrentId: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverPaymentDto[]> {
    return this.paymentService.findAllByReferrentId(referrentId, tenantId);
  }
}
