import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { IsIn, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {
  DriverCreateBookingDto,
  DriverCreateBookingItemDto,
  DriverCreateBookingItemSeatDto,
} from './driver-create-booking.dto';
import { SEAT_STATUS } from '@/common/constants/status.constants';

export class DriverUpdateBookingItemSeatDto extends PartialType(DriverCreateBookingItemSeatDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

export class DriverUpdateBookingItemDto extends OmitType(DriverCreateBookingItemDto, ['seat'] as const) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DriverUpdateBookingItemSeatDto)
  seat: DriverUpdateBookingItemSeatDto;
}

export class DriverUpdateBookingDto extends OmitType(DriverCreateBookingDto, ['bookingItems', 'status'] as const) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DriverUpdateBookingItemDto)
  bookingItems: DriverUpdateBookingItemDto[];
}

export class DriverRequestUpdateBookingItemBoardingDto {
  @IsNotEmpty()
  @IsIn([SEAT_STATUS.ON_BOARD, SEAT_STATUS.DROPPED_OFF])
  status: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  bookingItemIds: Types.ObjectId[];

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busScheduleId: Types.ObjectId;
}
