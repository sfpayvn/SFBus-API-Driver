import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { PaymentMethodService } from '@/module/core/payment-method/payment-method-service';
import { PaymentMethodDto } from '@/module/core/payment-method/dto/payment-method.dto';
import { DriverPaymentMethodDto } from './dto/driver-payment-method.dto';
import { COMMON_STATUS } from '@/common/constants/status.constants';
import { PosPaymentMethodDto } from '@/module/pos/pos-payment-method/dto/pos-payment-method.dto';
import { DriverBookingSortFilter } from '../driver-booking/dto/driver-booking.dto';

@Injectable()
export class DriverPaymentMethodService {
  constructor(
    @Inject(forwardRef(() => PaymentMethodService)) private readonly paymentMethodService: PaymentMethodService,
  ) {}

  async findAll(tenantIds: Types.ObjectId[]): Promise<PaymentMethodDto[]> {
    const filters: DriverBookingSortFilter[] = [];
    const filterByStatus = {
      key: 'status',
      value: [COMMON_STATUS.ACTIVE],
    };

    filters.push(filterByStatus);

    return this.paymentMethodService.findAll(tenantIds, filters);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosPaymentMethodDto> {
    const filters: DriverBookingSortFilter[] = [];
    const filterByStatus = {
      key: 'status',
      value: [COMMON_STATUS.ACTIVE],
    };

    filters.push(filterByStatus);

    return this.paymentMethodService.findOne(id, tenantIds, filters);
  }

  async findDefault(tenantIds: Types.ObjectId[]): Promise<PaymentMethodDto | null> {
    const filters: DriverBookingSortFilter[] = [];

    const filterByStatus = {
      key: 'status',
      value: [COMMON_STATUS.ACTIVE],
    };

    filters.push(filterByStatus);

    return this.paymentMethodService.findDefault(tenantIds, filters);
  }
}
