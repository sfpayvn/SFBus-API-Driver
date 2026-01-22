// otp.service.ts
import { AuthRescueService } from '@/module/core/auth/auth-rescue/auth-rescue.service';
import { AuthRescueDocument } from '@/module/core/auth/auth-rescue/schema/auth-rescue.schema';
import { Injectable, BadRequestException, ForbiddenException, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DriverTenantService } from '../../driver-tenant/driver-tenant.service';
import { DriverUserService } from '../../driver-user/driver-user-main/driver-user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DriverAuthRescueService {
  constructor(
    @InjectModel(AuthRescueDocument.name) private authRescueModel: Model<AuthRescueDocument>,
    @Inject(forwardRef(() => AuthRescueService)) private readonly authRescueService: AuthRescueService,
    @Inject(forwardRef(() => DriverTenantService)) private readonly driverTenantService: DriverTenantService,
    @Inject(forwardRef(() => DriverUserService)) private readonly driverUserService: DriverUserService,
    private jwtService: JwtService,
  ) {}

  async requestAuthRescue(identifier: string, purpose: string, tenantId: Types.ObjectId) {
    return this.authRescueService.requestAuthRescue(identifier, purpose, tenantId);
  }

  async verifyAuthRescue(identifier: string, purpose: string, token: string, tenantId: Types.ObjectId) {
    return this.authRescueService.verifyAuthRescue(identifier, purpose, token, tenantId);
  }
}
