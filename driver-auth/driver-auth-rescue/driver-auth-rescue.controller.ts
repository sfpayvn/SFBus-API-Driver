// otp.controller.ts
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { DriverAuthRescueService } from './driver-auth-rescue.service';
import { DriverRequestAuthRescueDto, DriverVerifyAuthRescueDto } from './dto/driver-auth-rescue.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { CurrentUser } from '@/decorators/current-user.decorator';

@Controller('driver/auth/rescue')
export class DriverAuthRescueController {
  constructor(private readonly driverAuthRescueService: DriverAuthRescueService) {}

  @Post('request')
  async request(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Body(ParseObjectIdPipe) driverRequestAuthRescueDto: DriverRequestAuthRescueDto,
  ) {
    const { tenantId } = user;
    const res = await this.driverAuthRescueService.requestAuthRescue(
      driverRequestAuthRescueDto.identifier,
      driverRequestAuthRescueDto.purpose,
      tenantId,
    );
    // PRODUCTION: return { success: true } (kh�ng tr? Token)
    return res;
  }

  @Post('verify')
  @HttpCode(200)
  async verify(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Body(ParseObjectIdPipe) driverVerifyAuthRescueDto: DriverVerifyAuthRescueDto,
  ) {
    const { tenantId } = user;
    return this.driverAuthRescueService.verifyAuthRescue(
      driverVerifyAuthRescueDto.identifier,
      driverVerifyAuthRescueDto.purpose,
      driverVerifyAuthRescueDto.token,
      tenantId,
    );
  }
}
