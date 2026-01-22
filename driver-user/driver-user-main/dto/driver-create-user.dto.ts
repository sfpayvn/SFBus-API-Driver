import { IsNotEmpty, IsString, IsOptional, IsEmail, IsEnum, IsDateString, IsBoolean, isBoolean } from 'class-validator';
import { Types } from 'mongoose';

export class DriverCreateUserAddressDto {
  addressType: string;
  address: string;
  isDefault: boolean;
}

export class DriverCreateUserDto {
  @IsOptional()
  tenantId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  avatarId: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  roles: string[];

  @IsOptional()
  addresses?: DriverCreateUserAddressDto[];

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'other'], {
    message: 'Gi?i t�nh ph?i l� male, female ho?c other.',
  })
  gender: string;

  @IsOptional()
  @IsBoolean()
  isEmailVerified: boolean;

  @IsOptional()
  @IsBoolean()
  isPhoneNumberVerified: boolean;

  @IsOptional()
  @IsDateString()
  birthdate?: string; // S? d?ng ISO String cho ng�y th�ng

  @IsNotEmpty()
  @IsBoolean()
  isTempPassWord: boolean; // S? d?ng ISO String cho ng�y th�ng

  resetTokenVersion: number;
}
