import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { DriverBusTypeService } from './driver-bus-type.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { DriverSearchBusTypesQuery } from './dto/driver-bus-type.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('driver/bus-type')
export class DriverBusTypeController {
  constructor(private readonly DriverBusTypeService: DriverBusTypeService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @UseInterceptors(MarkDefaultTenant())
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.DriverBusTypeService.findOne(id, tenantIds);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Get('find-all')
  findAll(@TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.DriverBusTypeService.findAll(tenantIds);
  }

  @Post('search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(MarkDefaultTenant())
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  search(@Body(ParseObjectIdPipe) query: DriverSearchBusTypesQuery, @TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
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
    return this.DriverBusTypeService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
  }
}
