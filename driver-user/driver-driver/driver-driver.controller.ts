// driver.controller.ts

import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverDriverService } from './driver-driver.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { DriverUpdateDriverDto } from './dto/driver-update-driver.dto';
import { DriverSearchDriversQuery } from './dto/driver-driver.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('driver/drivers')
export class DriverDriverController {
  constructor(private DriverDriverService: DriverDriverService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Put()
  update(
    @Body(ParseObjectIdPipe) DriverUpdateDriverDto: DriverUpdateDriverDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const tenantId = user.tenantId;
    return this.DriverDriverService.update(DriverUpdateDriverDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Get('find-one')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const tenantId = user.tenantId;
    return this.DriverDriverService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Get('/find-one-by-user/:userId')
  findOneByUser(
    @Param('userId', ParseObjectIdPipe) userId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const tenantId = user.tenantId;
    return this.DriverDriverService.findOneByUser(userId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Get('find-all-user-driver')
  findAllUserDriver(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const tenantId = user.tenantId;
    return this.DriverDriverService.findAllUserDriver(tenantId);
  }
}
