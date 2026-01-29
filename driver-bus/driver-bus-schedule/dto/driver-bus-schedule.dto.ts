import { Types } from 'mongoose';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { DriverBusProvinceDto } from '../../driver-bus-province/dto/driver-bus-province.dto';
import { DriverBusTemplateDto } from '../../driver-bus-template/dto/driver-bus-template.dto';
import { DriverBusDto } from '../../driver-bus-main/dto/driver-bus.dto';
import { DriverBusRouteDto } from '../../driver-bus-route/dto/driver-bus-route.dto';
import { DriverDriverDto } from '@/module/driver/driver-user/driver-driver/dto/driver-driver.dto';

export class DriverBusScheduleBreakPointsTimeDto {
  @Expose()
  busStationId: Types.ObjectId;

  @Expose()
  province: DriverBusProvinceDto;

  @Expose()
  name: string;

  @Expose()
  detailAddress: string;

  @Expose()
  location: string;

  @Expose()
  provinceId: Types.ObjectId;

  @Expose()
  timeSchedule: string;
}

export class DriverBusScheduleBusDto extends DriverBusDto {}

export class DriverBusScheduleRouteDto extends DriverBusRouteDto {
  @Expose()
  breakPoints: DriverBusScheduleBreakPointsTimeDto[];
}

export class DriverBusSeatPrices {
  @Expose()
  seatTypeId: Types.ObjectId;

  @Expose()
  seatTypeName: string;

  @Expose()
  price: number;
}

export class DriverBusScheduleDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  busScheduleNumber: string;

  @Expose()
  name: string;

  @Expose()
  busId?: Types.ObjectId;

  @Expose()
  currentStationId: Types.ObjectId;

  @Expose()
  busDriverIds: Types.ObjectId[];

  @Expose()
  busDrivers?: DriverDriverDto[];

  @Expose()
  bus?: DriverBusScheduleBusDto;

  @Expose()
  busTemplateId: Types.ObjectId;

  @Expose()
  busTemplate: DriverBusTemplateDto;

  @Expose()
  busRouteId: Types.ObjectId;

  @Expose()
  busRoute: DriverBusScheduleRouteDto;

  @Expose()
  busLayoutTemplateId: Types.ObjectId;

  @Expose()
  busScheduleTemplateId: Types.ObjectId;

  @Expose()
  busSeatPrices: DriverBusSeatPrices[];

  @Expose()
  remainSeat: number;

  @Expose()
  status: 'un_published' | 'scheduled' | 'overdue' | 'in_progress' | 'completed' | 'cancelled';

  @Expose()
  note?: string;

  @Expose()
  startDate: string;

  @Expose()
  endDate: string;

  @Exclude()
  busSeatLayoutBlockIds: Types.ObjectId[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class DriverSearchBusScheduleQuery {
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  departureDate: Date;

  @Type(() => String)
  @IsNotEmpty()
  departureId: Types.ObjectId;

  @Type(() => String)
  @IsNotEmpty()
  destinationId: Types.ObjectId;
}

export class DriverSearchBusSchedulePagingQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class DriverSearchBusSchedulePagingQuery {
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
  sortBy: DriverSearchBusSchedulePagingQuerySortFilter;

  @IsOptional()
  filters: DriverSearchBusSchedulePagingQuerySortFilter[];

  @IsOptional()
  startDate: string;

  @IsOptional()
  endDate: string;

  @Type(() => String)
  departureId: Types.ObjectId;

  @Type(() => String)
  destinationId: Types.ObjectId;
}

export class DriverSearchBusSchedulePagingRes {
  @Expose()
  pageIdx: number = 0;
  @Expose()
  busSchedules: DriverBusScheduleDto[];
  @Expose()
  totalPage: number = 0;
  @Expose()
  totalItem: number = 0;
}

export class SearchBusScheduleDriverQuery {
  @IsOptional()
  @IsString()
  keyword: string;

  @IsOptional()
  sortBy: DriverSearchBusSchedulePagingQuerySortFilter;

  @IsOptional()
  filters: DriverSearchBusSchedulePagingQuerySortFilter[];
}
