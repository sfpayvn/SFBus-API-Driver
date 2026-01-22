import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  ValidationPipe,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverSeatTypeService } from './driver-seat-type.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { DriverSearchSeatTypesQuery } from './dto/driver-seat-type.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('driver/seat-types')
export class DriverSeatTypeController {
  constructor(private readonly DriverSeatTypeService: DriverSeatTypeService) {}

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
    return this.DriverSeatTypeService.findOne(id, tenantIds);
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
  @Get('find-all')
  findAll(@TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.DriverSeatTypeService.findAll(tenantIds);
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
  search(@Body(ParseObjectIdPipe) query: DriverSearchSeatTypesQuery, @TenantScope() tenantScope: TenantScopeResult) {
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
    return this.DriverSeatTypeService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
  }
}
