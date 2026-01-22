// otp.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { DriverAuthRescueController } from './driver-auth-rescue.controller';
import { DriverAuthRescueService } from './driver-auth-rescue.service';
import { AuthRescueModule } from '@/module/core/auth/auth-rescue/auth-rescue.module';
import { DriverTenantModule } from '../../driver-tenant/driver-tenant.module';
import { DriverUserModule } from '../../driver-user/driver-user-main/driver-user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@/jwt/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => AuthRescueModule),
    forwardRef(() => DriverTenantModule),
    forwardRef(() => DriverUserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1y' },
      }),
    }),
  ],
  providers: [DriverAuthRescueService],
  controllers: [DriverAuthRescueController],
  exports: [DriverAuthRescueService],
})
export class DriverAuthRescueModule {}
