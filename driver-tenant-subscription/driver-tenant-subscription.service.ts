import { Injectable, BadRequestException, NotFoundException, forwardRef, Inject } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Types, ClientSession, Connection } from 'mongoose';
import {
  DriverRegisterSubscriptionDto,
  DriverSearchTenantSubscriptionQuerySortFilter,
  DriverSearchTenantSubscriptionRes,
  DriverTenantSubscriptionDto,
} from './dto/driver-tenant-subscription.dto';
import { plainToInstance } from 'class-transformer';
import { TenantSubscriptionService } from '@/module/core/tenant-subscription/tenant-subscription.service';

@Injectable()
export class DriverTenantSubscriptionService {
  constructor(
    @Inject(forwardRef(() => TenantSubscriptionService))
    private readonly tenantSubscriptionService: TenantSubscriptionService,
  ) {}

  async registerForTenant(
    tenantId: Types.ObjectId,
    dto: DriverRegisterSubscriptionDto,
  ): Promise<DriverTenantSubscriptionDto> {
    return this.tenantSubscriptionService.registerForTenant(tenantId, dto);
  }

  async findByTenantId(tenantId: Types.ObjectId): Promise<DriverTenantSubscriptionDto | null> {
    return this.tenantSubscriptionService.findByTenantId(tenantId);
  }

  async findAllByTenantId(tenantId: Types.ObjectId): Promise<DriverTenantSubscriptionDto[]> {
    return this.tenantSubscriptionService.findAllByTenantId(tenantId);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: DriverSearchTenantSubscriptionQuerySortFilter,
    filters: DriverSearchTenantSubscriptionQuerySortFilter[],
  ): Promise<DriverSearchTenantSubscriptionRes> {
    return this.tenantSubscriptionService.search(pageIdx, pageSize, keyword, sortBy, filters);
  }
}
