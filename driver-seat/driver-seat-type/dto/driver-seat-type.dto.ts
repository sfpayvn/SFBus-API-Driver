import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class DriverSeatTypeDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  icon: string;

  @Expose()
  iconId: Types.ObjectId;

  @Expose()
  isEnv: boolean;

  @Expose()
  isDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class DriverSearchSeatTypesQuerySortFilter {
  key: string;
  value: string;
}

export class DriverSearchSeatTypesQuery {
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
  sortBy: DriverSearchSeatTypesQuerySortFilter;

  @IsOptional()
  filters: DriverSearchSeatTypesQuerySortFilter[];
}

export class DriverSearchSeatTypeRes {
  pageIdx: number = 0;
  seatTypes: DriverSeatTypeDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}
