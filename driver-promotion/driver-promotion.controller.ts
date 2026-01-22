import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { RolesGuard } from '@/guards/roles.guard';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { Roles } from '@/decorators/roles.decorator';

import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { DriverPromotionService } from './driver-promotion-service';
import {
  DriverRedeemPromotionDto,
  DriverRequestPromotionByRule,
  DriverRequestPromotionMass,
} from './dto/driver-promotion.dto';
import { QuotaHeadersInterceptor } from '@/interceptors/quota-headers.interceptor';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('driver/promotion')
export class DriverPromotionController {
  constructor(private readonly DriverPromotionService: DriverPromotionService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Post('redeem')
  redeem(
    @Body(ParseObjectIdPipe) DriverRedeemPromotionDto: DriverRedeemPromotionDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.DriverPromotionService.redeem(DriverRedeemPromotionDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @UseInterceptors(MarkDefaultTenant())
  @Get()
  findAll(@TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.DriverPromotionService.findAll(tenantIds);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.DriverPromotionService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Post('find-all-by-rule')
  findAllByRule(
    @Body(ParseObjectIdPipe) query: DriverRequestPromotionByRule,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { userId, bookingIds } = query;
    const { tenantId } = user;
    return this.DriverPromotionService.findAllByRule(userId, bookingIds, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Post('find-mass-promotion')
  findMassPromotion(
    @Body(ParseObjectIdPipe) query: DriverRequestPromotionMass,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.DriverPromotionService.findMassPromotion(tenantId);
  }
}
