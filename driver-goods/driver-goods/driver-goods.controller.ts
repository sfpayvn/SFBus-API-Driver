import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverGoodsService } from './driver-goods-service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { UpdateAuditFields } from '@/decorators/update-audit-fields.decorator';
import { DriverRequestUpdateGoodsBoardingDto } from './dto/driver-update-goods.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('driver/goods')
export class DriverGoodsController {
  constructor(private readonly driverGoodsService: DriverGoodsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Get('find-all-goods-for-bus-schedule')
  findAllGoodsForBusSchedule(
    @Query('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.driverGoodsService.findAllGoodsForBusSchedule(busScheduleId, tenantId);
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
  findOne(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.driverGoodsService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UpdateAuditFields({ updateCreatedBy: false, updateUpdatedBy: true })
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Put('updates-goods-schedule-boarding')
  updates(
    @Body(ParseObjectIdPipe) driverRequestUpdateGoodsBoardingDto: DriverRequestUpdateGoodsBoardingDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id: updatedBy } = user;
    return this.driverGoodsService.updateGoodsScheduleBoarding(
      driverRequestUpdateGoodsBoardingDto,
      tenantId,
      updatedBy,
    );
  }
}
