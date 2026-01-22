import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DriverCreateSettingDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  groupName?: string;
}
