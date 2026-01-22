import { Exclude, Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';
import { IsInt } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { BusRouteDto } from '@/module/core/bus/bus-route/dto/bus-route.dto';
import { BusScheduleDto } from '@/module/core/bus/bus-schedule/dto/bus-schedule.dto';
import { DriverGoodsCategoryDto } from '../../driver-good-category/dto/driver-goods-category.dto';

export class DriverGoodsDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  busScheduleId: Types.ObjectId;

  @Expose()
  busSchedule: BusScheduleDto;

  @Expose()
  name: string;

  @Expose()
  goodsNumber: string;

  @Expose()
  customerName: string;

  @Expose()
  customerPhoneNumber: string;

  @Expose()
  customerAddress: string;

  @Expose()
  senderName: string;

  @Expose()
  senderPhoneNumber: string;

  @Expose()
  senderAddress: string;

  @Expose()
  goodsPriority: number;

  @Expose()
  goodsImportant: boolean;

  @Expose()
  quantity: number;

  @Expose()
  shippingCost: number;

  @Expose()
  cod: number;

  @Expose()
  goodsValue: number;

  @Expose()
  categories: DriverGoodsCategoryDto[];

  @Expose()
  busRouteId: Types.ObjectId;

  @Expose()
  weight: number;

  @Expose()
  length: number;

  @Expose()
  width: number;

  @Expose()
  busRoute: BusRouteDto;

  @Expose()
  note: string;

  @Expose()
  status: string;

  @Expose()
  paidBy: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class DriverGoodsSortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string | string[];
}

export class DriverSearchGoodsPagingQuery {
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
  sortBy: DriverGoodsSortFilter;

  @IsOptional()
  filters: DriverGoodsSortFilter[];
}

export class DriverSearchGoodsPagingRes {
  pageIdx: number = 0;
  goods: DriverGoodsDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}
