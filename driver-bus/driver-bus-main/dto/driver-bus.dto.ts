// src/bus/interfaces/bus.interface.ts
import { Types } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { DriverBusTemplateDto } from '../../driver-bus-template/dto/driver-bus-template.dto';

export class DriverBusDto {
  @Expose()
  _id: string;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  busTemplateId: Types.ObjectId;

  @Expose()
  busTemplate: DriverBusTemplateDto;

  @Expose()
  licensePlate: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class DriverSearchBusQuerySortFilter {
  key: string;
  value: string;
}

export class DriverSearchBusQuery {
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
  sortBy: DriverSearchBusQuerySortFilter;

  @IsOptional()
  @IsString()
  filters: DriverSearchBusQuerySortFilter[];
}

export class DriverSearchBusRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  buses: DriverBusDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
