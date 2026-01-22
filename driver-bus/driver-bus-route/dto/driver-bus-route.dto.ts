import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

export class DriverBusRouteDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  breakPoints: DriverBusRouteBreakPointsDto[];

  @Expose()
  distance: number;

  @Expose()
  distanceTime: string;

  @Expose()
  notes?: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class DriverBusRouteBreakPointsDto {
  busStationId: Types.ObjectId;
}

export class DriverSearchBusRouteQuerySortFilter {
  key: string;
  value: string;
}

export class DriverSearchBusRouteQuery {
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
  sortBy: DriverSearchBusRouteQuerySortFilter;

  @IsOptional()
  filters: DriverSearchBusRouteQuerySortFilter[];
}

export class DriverSearchBusRouteRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busRoutes: DriverBusRouteDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
