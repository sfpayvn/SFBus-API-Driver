import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverPaymentService } from './driver-payment-service';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { DriverRequestPaymentDto } from './dto/driver-payment.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('driver/payment')
export class DriverPaymentController {
  constructor(private readonly driverPaymentService: DriverPaymentService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Post('/processBookingPayment')
  processBookingPayment(
    @Body(ParseObjectIdPipe) driverRequestPaymentDto: DriverRequestPaymentDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id } = user;
    return this.driverPaymentService.processBookingPayment(driverRequestPaymentDto, tenantId, _id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Post('/processGoodsPayment')
  processGoodsPayment(
    @Body(ParseObjectIdPipe) driverRequestPaymentDto: DriverRequestPaymentDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id } = user;
    return this.driverPaymentService.processGoodsPayment(driverRequestPaymentDto, tenantId, _id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Get('find-by-referrent-id/:referrentId')
  findAllByReferrentId(
    @Param('referrentId', ParseObjectIdPipe) referrentId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const tenantId = user.tenantId;
    return this.driverPaymentService.findAllByReferrentId(referrentId, tenantId);
  }
}
