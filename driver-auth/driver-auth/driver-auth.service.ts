// auth.service.ts

import { BadRequestException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DriverUserService } from '../../driver-user/driver-user-main/driver-user.service';
import { DriverUserDto } from '../../driver-user/driver-user-main/dto/driver-user.dto';
import { DriverTenantService } from '../../driver-tenant/driver-tenant.service';
import { AuthService } from '@/module/core/auth/auth/auth.service';
import { Types } from 'mongoose';
import { DriverSignUpDto } from './dto/driver-auth.dto';
import { DriverAuthRescueService } from '../driver-auth-rescue/driver-auth-rescue.service';
import { plainToInstance } from 'class-transformer';
import { DriverUpdatePasswordUserDto } from '../../driver-user/driver-user-main/dto/driver-update-user.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Injectable()
export class DriverAuthService {
  constructor(
    @Inject(forwardRef(() => DriverUserService)) private readonly driverUserService: DriverUserService,
    @Inject(forwardRef(() => DriverTenantService)) private readonly driverTenantService: DriverTenantService,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
    @Inject(forwardRef(() => DriverAuthRescueService))
    @Inject(forwardRef(() => AuthService))
    private readonly driverAuthRescueService: DriverAuthRescueService,
    private jwtService: JwtService,
  ) {}

  // Đăng nhập và trả về JWT token
  async login(driverUser: DriverUserDto) {
    const allowedRoles = [
      ROLE_CONSTANTS.TENANT,
      ROLE_CONSTANTS.TENANT_OPERATOR,
      ROLE_CONSTANTS.DRIVER,
      ROLE_CONSTANTS.POS,
    ];
    if (!driverUser.roles.some((role) => allowedRoles.includes(role))) {
      throw new UnauthorizedException('Tài khoản của bạn không đủ quyền để đăng nhập vào ứng dụng này.');
    }

    const payload = {
      _id: driverUser._id.toString(),
      roles: driverUser.roles,
      tenantId: driverUser.tenantId?.toString(),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Xác thực người dùng khi đăng nhập
  async verifyPhoneNumber(phoneNumber: string): Promise<any> {
    const user = await this.driverUserService.findByPhoneNumber(phoneNumber);
    if (user) {
      return user.name;
    }
    return null;
  }

  async verifyForgotPasswordOtp(identifier: string, tenantCode: string, purpose: string, token: string) {
    const tenant = await this.driverTenantService.findByCode(tenantCode);

    if (!tenant) {
      throw new UnauthorizedException('Tenant not found');
    }

    const result = await this.driverAuthRescueService.verifyAuthRescue(identifier, purpose, token, tenant._id);
    if (result) {
      const tokenForgotPassword = await this.authService.createForgotPasswordToken(identifier, tenantCode);
      return { token: tokenForgotPassword };
    }

    return null;
  }

  async forgotPassword(phoneNumber: string, tenantCode: string, redirectBaseUrl?: string) {
    const tenant = await this.driverTenantService.findByCode(tenantCode);

    if (!tenant || !tenant.code) {
      throw new UnauthorizedException('Số điện thoại không tồn tại.');
    }

    return this.authService.forgotPassword(phoneNumber, tenant.code, redirectBaseUrl);
  }

  resetPassword(token: string, newPassword: string) {
    return this.authService.resetPassword(token, newPassword);
  }

  async updatePassword(
    userId: Types.ObjectId,
    driverUpdatePasswordUserDto: DriverUpdatePasswordUserDto,
    tenantId: Types.ObjectId,
  ) {
    return this.driverUserService.updatePassword(userId, driverUpdatePasswordUserDto, tenantId);
  }

  async getCurrentUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverUserDto> {
    const foundUser = await this.driverUserService.findById(userId, tenantId);
    if (!foundUser) {
      throw new BadRequestException('User not found.');
    }
    return plainToInstance(DriverUserDto, foundUser);
  }
}
