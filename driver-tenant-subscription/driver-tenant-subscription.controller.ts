import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from '@/decorators/roles.decorator';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import {
  DriverRegisterSubscriptionDto,
  DriverRegisterSubscriptionForTenantDto,
  DriverSearchTenantSubscriptionQuery,
} from './dto/driver-tenant-subscription.dto';
import { DriverTenantSubscriptionService } from './driver-tenant-subscription.service';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('driver/tenant-subscription')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DriverTenantSubscriptionController {
  constructor(private DriverTenantSubscriptionService: DriverTenantSubscriptionService) {}

  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  ) // hoặc 'owner' tuỳ mô hình
  @Post('register')
  register(
    @Body(ParseObjectIdPipe) DriverRegisterSubscriptionDto: DriverRegisterSubscriptionDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const tenantId = new Types.ObjectId(user.tenantId);
    return this.DriverTenantSubscriptionService.registerForTenant(tenantId, DriverRegisterSubscriptionDto);
  }

  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  ) // hoặc 'owner' tuỳ mô hình
  @Post('register-for-tenant')
  registerForTenant(@Body(ParseObjectIdPipe) dto: DriverRegisterSubscriptionForTenantDto) {
    return this.DriverTenantSubscriptionService.registerForTenant(dto.tenantId, dto);
  }

  @Post('search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  search(@Body(ParseObjectIdPipe) query: DriverSearchTenantSubscriptionQuery) {
    const {
      pageIdx = 0,
      pageSize = 0,
      keyword = '',
      sortBy = {
        key: 'createdAt',
        value: 'desc',
      },
      filters = [],
    } = query;
    return this.DriverTenantSubscriptionService.search(+pageIdx, +pageSize, keyword, sortBy, filters);
  }
}
