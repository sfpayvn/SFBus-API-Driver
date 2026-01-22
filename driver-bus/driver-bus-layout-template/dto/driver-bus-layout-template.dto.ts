import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class DriverSeatDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  index: number;

  @Expose()
  typeId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  status: string;
}

export class DriverBusSeatLayoutTemplateDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  seats: DriverSeatDto[];
}

export class DriverBusLayoutTemplateDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  seatLayouts: DriverBusSeatLayoutTemplateDto[];

  @Expose()
  isDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class DriverSearchBusLayoutTemplateQuerySortFilter {
  key: string;
  value: string;
}

export class DriverSearchBusLayoutTemplateQuery {
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
  sortBy: DriverSearchBusLayoutTemplateQuerySortFilter;

  @IsOptional()
  filters: DriverSearchBusLayoutTemplateQuerySortFilter[];
}

export class DriverSearchBusTemplateRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busLayoutTemplates: DriverBusLayoutTemplateDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
