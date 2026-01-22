import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Req,
  Param,
  Query,
  Body,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from '@/guards/local-auth.guard.ts';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { DriverForgotPasswordDto, DriverResetPasswordDto, DriverSignUpDto } from './dto/driver-auth.dto';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverAuthService } from './driver-auth.service';
import { ForgotPasswordDto, ResetPasswordDto } from '@/module/core/auth/auth/dto/auth.dto';
import { DriverVerifyAuthRescueDto } from '../driver-auth-rescue/dto/driver-auth-rescue.dto';
import { RolesGuard } from '@/guards/roles.guard';
import { StripFields } from '@/interceptors/strip-fields.interceptor';
import { DriverUpdatePasswordUserDto } from '../../driver-user/driver-user-main/dto/driver-update-user.dto';

@Controller('driver/auth')
export class AuthController {
  constructor(private driverAuthService: DriverAuthService) {}

  // Endpoint đăng nhập
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // Sau khi LocalStrategy xác thực, req.user sẽ chứa thông tin người dùng
    return this.driverAuthService.login(req.user);
  }

  @Get('verify-phoneNumber')
  async verifyPhoneNumber(@Query('phoneNumber') phoneNumber: string) {
    const name = await this.driverAuthService.verifyPhoneNumber(phoneNumber);
    return JSON.stringify(name);
  }

  // Endpoint kiểm tra token
  @UseGuards(JwtAuthGuard)
  @Get('validate-token')
  async validateToken(@Request() req) {
    // Nếu token hợp lệ, trả về thông tin người dùng
    return { valid: true, user: req.user };
  }

  @Post('verify-forgot-password-otp')
  @HttpCode(200)
  async verifyForgotPasswordOtp(@Body(ParseObjectIdPipe) driverVerifyAuthRescueDto: DriverVerifyAuthRescueDto) {
    return this.driverAuthService.verifyForgotPasswordOtp(
      driverVerifyAuthRescueDto.identifier,
      driverVerifyAuthRescueDto.tenantCode,
      driverVerifyAuthRescueDto.purpose,
      driverVerifyAuthRescueDto.token,
    );
  }

  @Post('forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body(ParseObjectIdPipe) driverForgotPasswordDto: DriverForgotPasswordDto) {
    return this.driverAuthService.forgotPassword(
      driverForgotPasswordDto.phoneNumber,
      driverForgotPasswordDto.tenantCode,
      driverForgotPasswordDto.redirectBaseUrl,
    );
  }

  @Post('reset-password')
  async reset(@Body(ParseObjectIdPipe) driverResetPasswordDto: DriverResetPasswordDto) {
    return this.driverAuthService.resetPassword(driverResetPasswordDto.token, driverResetPasswordDto.newPassword);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Post('update-password')
  async updatePassword(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Body(ParseObjectIdPipe) driverUpdatePasswordUserDto: DriverUpdatePasswordUserDto,
  ) {
    const { tenantId, _id } = user;
    const updatedUser = await this.driverAuthService.updatePassword(_id, driverUpdatePasswordUserDto, tenantId);
    return {
      message: 'Cập nhật thông tin thành công!',
      user: {
        email: updatedUser.email,
        name: updatedUser.name,
      },
    };
  }

  // Endpoint lấy thông tin ngư�i dùng hiện tại
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Get('get-current-user')
  async getCurrentUser(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId, _id: userId } = user;
    return this.driverAuthService.getCurrentUser(userId, tenantId);
  }
}
