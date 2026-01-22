// request-otp.dto.ts
import { IsIn, IsNotEmpty, IsString, Length } from 'class-validator';

export class DriverRequestAuthRescueDto {
  @IsString()
  @IsNotEmpty()
  identifier: string; // email hoặc phone

  @IsIn(['2fa'])
  purpose: '2fa';
}

export class DriverVerifyAuthRescueDto {
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  @IsNotEmpty()
  tenantCode: string;

  @IsIn(['2fa'])
  purpose: '2fa';

  @IsString()
  token: string;
}
