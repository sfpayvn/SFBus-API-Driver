import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { DriverBusScheduleDto } from '../../driver-bus/driver-bus-schedule/dto/driver-bus-schedule.dto';
import { DriverPaymentDto } from '../../driver-payment/dto/driver-payment.dto';
import { DriverPromotionDto } from '../../driver-promotion/dto/driver-promotion.dto';

export class DriverUserInforBookingDto {
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  phoneNumber: string;
}

export class DriverBookingItemSeatDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  @Type(() => String)
  seatNumber: string;

  @Expose()
  @Type(() => String)
  name: string;

  @Expose()
  @Type(() => String)
  status: string;
}

export class DriverBookingItemDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  @Type(() => String)
  bookingItemNumber: string;

  @Expose()
  @Type(() => DriverBookingItemSeatDto)
  seat: DriverBookingItemSeatDto;

  @Expose()
  @Type(() => Number)
  price: number;

  @Expose()
  @Type(() => Number)
  discountAmount: number;

  @Expose()
  @Type(() => Number)
  afterDiscountPrice: number;

  @Expose()
  @Type(() => String)
  departure: string;

  @Expose()
  @Type(() => String)
  destination: string;

  @Exclude()
  createdBy: Types.ObjectId;

  @Exclude()
  updatedBy: Types.ObjectId;
}

export class DriverBookingDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  @Type(() => String)
  tenantId: string;

  @Expose()
  @Type(() => String)
  userId: string;

  @Expose()
  @Type(() => Number)
  quantity: number;

  @Expose()
  @Type(() => DriverUserInforBookingDto)
  userInfo: DriverUserInforBookingDto;

  @Expose()
  @Type(() => String)
  bookingNumber: string;

  @Expose()
  @Type(() => String)
  busScheduleId: string;

  @Expose()
  @Type(() => String)
  busRouteId: string;

  @Expose()
  @Type(() => DriverBusScheduleDto)
  busSchedule: DriverBusScheduleDto;

  @Expose()
  @Type(() => DriverBookingItemDto)
  bookingItems: DriverBookingItemDto[];

  @Expose()
  @Type(() => DriverPromotionDto)
  promotion: DriverPromotionDto;

  @Expose()
  @Type(() => DriverPaymentDto)
  payments: DriverPaymentDto[];

  @Expose()
  @Type(() => Number)
  totalPrice: number;

  @Expose()
  @Type(() => Number)
  discountTotalAmount: number;

  @Expose()
  @Type(() => Number)
  afterDiscountTotalPrice: number;

  @Expose()
  @Type(() => Date)
  paymentTime?: Date; // Thêm trường thời gian thanh toán

  @Expose()
  @Type(() => String)
  bookingGroupNumber: string;

  @Expose()
  @Type(() => String)
  status: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;

  @Exclude()
  createdBy: Types.ObjectId;

  @Exclude()
  updatedBy: Types.ObjectId;
}

export class DriverBookingSortFilter {
  @IsOptional()
  @IsString()
  key: string;

  @IsOptional()
  value: string | string[];
}

export class DriverSearchBookingPagingQuery {
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
  @Type(() => String)
  keyword: string;

  @IsOptional()
  @Type(() => DriverBookingSortFilter)
  sortBy: DriverBookingSortFilter;

  @IsOptional()
  @Type(() => DriverBookingSortFilter)
  filters: DriverBookingSortFilter[];
}

export class DriverSearchBookingPagingRes {
  @Expose()
  @Type(() => Number)
  pageIdx: number = 0;

  @Expose()
  @Type(() => DriverBookingDto)
  bookings: DriverBookingDto[];

  @Expose()
  @Type(() => Number)
  totalPage: number = 0;

  @Expose()
  @Type(() => Number)
  totalItem: number = 0;
}

export class DriverRequestUpdatePaymentMethodByIdsDto {
  @IsArray()
  @Type(() => Types.ObjectId)
  bookingIds: Types.ObjectId[];

  @Type(() => Types.ObjectId)
  paymentMethodId: Types.ObjectId;

  @Type(() => Types.ObjectId)
  userId: Types.ObjectId;
}
