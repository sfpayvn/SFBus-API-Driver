import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Date, Types } from 'mongoose';

export class DriverBusServiceDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  iconId: Types.ObjectId;

  @Expose()
  icon: string;

  @Expose()
  isDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class DriverSearchBusServicesQuerySortFilter {
  key: string;
  value: string;
}

export class DriverSearchBusServicesQuery {
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
  sortBy: DriverSearchBusServicesQuerySortFilter;

  @IsOptional()
  filters: DriverSearchBusServicesQuerySortFilter[];
}

export class DriverSearchBusServicesRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busServices: DriverBusServiceDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
