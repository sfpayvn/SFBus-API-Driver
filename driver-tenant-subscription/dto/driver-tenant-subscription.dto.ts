import { SubscriptionLimitationDto } from '@/module/core/subscription/dto/subscription.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsMongoId,
  IsOptional,
  IsIn,
  IsBoolean,
  IsInt,
  Min,
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class DriverTenantSubscriptionDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  subscriptionId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  duration: number; // cùng đơn vị với durationUnit

  @Expose()
  durationUnit: string;

  @Expose()
  startAt: Date;

  @Expose()
  endAt: Date;

  @Expose()
  status: 'active' | 'canceled' | 'expired';

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class DriverRegisterSubscriptionDto {
  @IsMongoId()
  subscriptionId: string;

  @IsOptional()
  @IsDateString()
  startAt?: string; // ISO; mặc định now

  @IsOptional()
  @IsIn(['month', 'day'])
  durationUnit?: 'month' | 'day'; // mặc định month (theo plan)

  @IsOptional()
  @IsInt()
  @Min(0)
  durationOverride?: number; // override duration của plan

  @IsOptional()
  @IsBoolean()
  replaceCurrent?: boolean; // true = hủy active hiện tại và thay thế
}

export class DriverRegisterSubscriptionForTenantDto extends DriverRegisterSubscriptionDto {
  @IsMongoId()
  tenantId: Types.ObjectId;
}

export class DriverSearchTenantSubscriptionQuerySortFilter {
  key: string;
  value: string;
}

export class DriverSearchTenantSubscriptionQuery {
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
  sortBy: DriverSearchTenantSubscriptionQuerySortFilter;

  @IsOptional()
  filters: DriverSearchTenantSubscriptionQuerySortFilter[];
}

export class DriverSearchTenantSubscriptionRes {
  pageIdx: number = 0;
  tenantSubscriptions: DriverTenantSubscriptionDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}
