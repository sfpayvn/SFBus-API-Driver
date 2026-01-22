import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverBusStationService } from './driver-bus-station.service';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Types } from 'mongoose';
import { DriverSearchBusStationsQuery } from './dto/driver-bus-station.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('driver/bus-station')
export class DriverBusStationController {
  constructor(private readonly DriverBusStationService: DriverBusStationService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @UseInterceptors(MarkDefaultTenant())
  @Get('find-all')
  findAll(@TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.DriverBusStationService.findAll(tenantIds);
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
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.DriverBusStationService.findOne(id, tenantIds);
  }

  @Get('findOneByProvinceId/:provinceId')
  findOneByProvinceId(
    @Param('provinceId', ParseObjectIdPipe) provinceId: Types.ObjectId,
    @TenantScope() tenantScope: TenantScopeResult,
  ) {
    const { tenantIds } = tenantScope;
    return this.DriverBusStationService.findOneByProvinceId(provinceId, tenantIds);
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
  search(@TenantScope() tenantScope: TenantScopeResult, @Body(ParseObjectIdPipe) query: DriverSearchBusStationsQuery) {
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
    return this.DriverBusStationService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
  }
}
