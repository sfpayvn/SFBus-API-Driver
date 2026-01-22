// bus-Layout.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverBusScheduleLayoutService } from './driver-bus-schedule-layout.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('driver/bus-schedule-layouts')
export class DriverBusScheduleLayoutController {
  constructor(private readonly DriverBusScheduleLayoutService: DriverBusScheduleLayoutService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Get()
  async findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.DriverBusScheduleLayoutService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Get('find-one/:id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.DriverBusScheduleLayoutService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Get('find-one-by-bus-schedule/:busScheduleId')
  async findOneByBusSchedule(
    @Param('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.DriverBusScheduleLayoutService.findOneByBusSchedule(busScheduleId, tenantId);
  }
}
