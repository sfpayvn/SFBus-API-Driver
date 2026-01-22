// src/BusTemplate/interfaces/BusTemplate.interface.ts
import { Types } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { DriverBusServiceDto } from '../../driver-bus-service/dto/driver-bus-service.dto';
import { DriverBusTypeDto } from '../../driver-bus-type/dto/driver-bus-type.dto';

export class DriverBusTemplateDto {
  @Expose()
  _id: string;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  busServiceIds: Types.ObjectId[];

  @Expose()
  busServices: DriverBusServiceDto[];

  @Expose()
  busTypeId: Types.ObjectId;

  @Expose()
  busType: DriverBusTypeDto;

  @Expose()
  busLayoutTemplateId: Types.ObjectId;

  @Expose()
  isDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class DriverSearchBusTemplateQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class DriverSearchBusTemplateQuery {
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
  sortBy: DriverSearchBusTemplateQuerySortFilter;

  @IsOptional()
  filters: DriverSearchBusTemplateQuerySortFilter[];
}

export class DriverSearchBusTemplateRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busTemplates: DriverBusTemplateDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
