import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { TenantService } from '../../core/tenant/tenant.service';

@Injectable()
export class DriverTenantService {
  constructor(@Inject(forwardRef(() => TenantService)) private readonly tenantService: TenantService) {}

  findOne(id: string) {
    return this.tenantService.findOne(new Types.ObjectId(id));
  }

  findByPhoneNumber(phoneNumber: string) {
    return this.tenantService.findByPhoneNumber(phoneNumber);
  }

  async findByCode(code: string) {
    return this.tenantService.findByCode(code);
  }
}
