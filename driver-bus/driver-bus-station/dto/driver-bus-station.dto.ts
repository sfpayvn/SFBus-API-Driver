import { Type, Expose, Exclude } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class DriverBusStationDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  readonly name: string;

  @Expose()
  readonly detailAddress: string;

  @Expose()
  readonly location: string;

  @Expose()
  readonly provinceId: Types.ObjectId;

  @Expose()
  readonly imageId?: Types.ObjectId;

  @Expose()
  readonly image?: any;

  @Expose()
  isDefault?: boolean;

  @Expose()
  isActive?: boolean;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  __v?: number;
}

export class DriverSearchBusStationsQuerySortFilter {
  key: string;
  value: string;
}

export class DriverSearchBusStationsQuery {
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
  sortBy: DriverSearchBusStationsQuerySortFilter;

  @IsOptional()
  filters: DriverSearchBusStationsQuerySortFilter[];
}

export class DriverSearchBusStationsRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busStations: DriverBusStationDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
