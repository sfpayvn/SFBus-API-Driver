import { Types } from 'mongoose';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { DriverBusRouteDto } from '../../driver-bus-route/dto/driver-bus-route.dto';
import { DriverBusSeatPrices } from '../../driver-bus-schedule/dto/driver-bus-schedule.dto';

export class DriverBusScheduleTemplateBreakPointsTimeDto {
  @Expose()
  busStationId: Types.ObjectId;

  @Expose()
  timeOffset: string;
}

export class DriverBusScheduleTemplateRouteDto extends DriverBusRouteDto {
  @Expose()
  breakPoints: DriverBusScheduleTemplateBreakPointsTimeDto[];
}

export class DriverBusScheduleTemplateSeatPrices extends DriverBusSeatPrices {}

export class DriverBusScheduleTemplateDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  busId: Types.ObjectId;

  @Expose()
  busDriverIds: Types.ObjectId[];

  @Expose()
  busTemplateId: Types.ObjectId;

  @Expose()
  busSeatLayoutBlockIds: Types.ObjectId[] = [];

  @Expose()
  busRouteId: Types.ObjectId;

  @Expose()
  busRoute: DriverBusScheduleTemplateRouteDto;

  @Expose()
  busSeatPrices: DriverBusScheduleTemplateSeatPrices[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class DriverSearchBusScheduleTemplateQuerySortFilter {
  key: string;
  value: string;
}

export class DriverSearchBusScheduleTemplateQuery {
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
  sortBy: DriverSearchBusScheduleTemplateQuerySortFilter;

  @IsOptional()
  filters: DriverSearchBusScheduleTemplateQuerySortFilter[];
}

export class DriverSearchBusScheduleTemplateRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busScheduleTemplates: DriverBusScheduleTemplateDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
