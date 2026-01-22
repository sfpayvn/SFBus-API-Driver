import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class DriverSignUpDto {
  @IsNotEmpty()
  @Type(() => String)
  tenantName: string;

  @IsNotEmpty()
  @Type(() => String)
  tenantCode: string;

  @IsNotEmpty()
  @Type(() => String)
  phoneNumber: string;

  @IsNotEmpty()
  @Type(() => String)
  password: string;
}

export class DriverForgotPasswordDto {
  @IsNotEmpty()
  @Type(() => String)
  phoneNumber: string;

  @IsNotEmpty()
  @Type(() => String)
  tenantCode: string;

  @IsOptional()
  @Type(() => String)
  redirectBaseUrl?: string;
}
export class DriverResetPasswordDto {
  @IsNotEmpty()
  @Type(() => String)
  token: string;

  @IsNotEmpty()
  @Type(() => String)
  newPassword: string;
}
