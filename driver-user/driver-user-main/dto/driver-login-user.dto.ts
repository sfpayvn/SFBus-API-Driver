import { IsNotEmpty, IsString } from 'class-validator';

export class DriverLoginUserDto {
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly tenantCode: string;
}
