// auth.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DriverAuthService } from './driver-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './driver-auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from '@/jwt/local.strategy';
import { JwtStrategy } from '@/jwt/jwt.strategy';
import { DriverUserModule } from '../../driver-user/driver-user-main/driver-user.module';
import { DriverTenantModule } from '../../driver-tenant/driver-tenant.module';
import { AuthModule } from '@/module/core/auth/auth/auth.module';
import { UserModule } from '@/module/core/user/user/user.module';
import { DriverAuthRescueModule } from '../driver-auth-rescue/driver-auth-rescue.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => DriverAuthRescueModule),
    forwardRef(() => DriverUserModule),
    forwardRef(() => DriverTenantModule),
    forwardRef(() => PassportModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1y' },
      }),
    }),
  ],
  providers: [DriverAuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class DriverAuthModule {}
