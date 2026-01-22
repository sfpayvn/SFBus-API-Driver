import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query, Put } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverBookingService } from './driver-booking-service';
import { Roles } from '@/decorators/roles.decorator';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { DriverCreateBookingDto } from './dto/driver-create-booking.dto';
import {
  DriverUpdateBookingDto,
  DriverRequestUpdateBookingItemBoardingDto,
  DriverUpdateBookingItemDto,
} from './dto/driver-update-booking.dto';
import { DriverSearchBookingPagingQuery } from './dto/driver-booking.dto';
import { UpdateAuditFields } from '@/decorators/update-audit-fields.decorator';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('driver/booking')
export class DriverBookingController {
  constructor(private readonly driverBookingService: DriverBookingService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @UpdateAuditFields({ updateCreatedBy: false, updateUpdatedBy: true })
  @Put('update-booking-item/:busScheduleId')
  updateBookingItem(
    @Body(ParseObjectIdPipe) driverUpdateBookingItemDto: DriverUpdateBookingItemDto,
    @Param('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id } = user;
    return this.driverBookingService.updateBookingItem(busScheduleId, driverUpdateBookingItemDto, tenantId, _id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Put('update-booking-item-boarding')
  updateBookingItemBoarding(
    @Body(ParseObjectIdPipe) dto: DriverRequestUpdateBookingItemBoardingDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    return this.driverBookingService.updateBookingItemBoarding(dto, user.tenantId, user._id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const tenantId = user.tenantId;
    return this.driverBookingService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Get('find-all-by-schedule-id/:busScheduleId')
  findAllByScheduleId(
    @Param('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const tenantId = user.tenantId;
    return this.driverBookingService.findAllByScheduleId(busScheduleId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN)
  @Get('find-one-by-booking-item-id/:bookingItemId')
  findOneBookingsByBookingItemId(
    @Param('bookingItemId', ParseObjectIdPipe) bookingItemId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.driverBookingService.findOneBookingsByBookingItemId(bookingItemId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Post('search')
  async search(
    @Body(ParseObjectIdPipe) query: DriverSearchBookingPagingQuery,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    const {
      pageIdx = 0,
      pageSize = 0,
      keyword = '',
      sortBy = { key: 'createdAt', value: 'desc' as const },
      filters = [],
    } = query;

    return this.driverBookingService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
  }
}
