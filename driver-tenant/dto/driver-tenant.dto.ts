import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { DriverPaymentDto } from '../../driver-payment/dto/driver-payment.dto';

export class DriverTenantSettingDto {
  @Expose()
  readonly appearance: string;

  @Expose()
  readonly timezone: string;
}

export class DriverTenantDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  readonly code: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly phoneNumber: string;

  @Expose()
  readonly email?: string;

  @Expose()
  readonly address?: string;

  @Expose()
  readonly logo?: string;

  @Expose()
  readonly setting: DriverTenantSettingDto;

  @Expose()
  subscriptionId?: Types.ObjectId;

  @Expose()
  readonly status?: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class DriverSearchTenantQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class DriverSearchTenantQuery {
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  pageIdx: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  pageSize: number;

  @IsOptional()
  @IsString()
  keyword: string;

  @IsOptional()
  sortBy: DriverSearchTenantQuerySortFilter;

  @IsOptional()
  filters: DriverSearchTenantQuerySortFilter[];
}

export class DriverSearchTenantsRes {
  pageIdx: number = 0;
  tenants: DriverTenantDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}
