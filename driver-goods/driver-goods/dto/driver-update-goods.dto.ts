import { GOODS_STATUS } from '@/common/constants/status.constants';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class DriverUpdateGoodsStatus {
  @IsNotEmpty()
  @Type(() => String)
  _id: string;

  @IsNotEmpty()
  @Type(() => String)
  status: string;
}

export class DriverRequestUpdateGoodsBoardingDto {
  @IsNotEmpty()
  @IsIn([GOODS_STATUS.PENDING, GOODS_STATUS.ON_BOARD, GOODS_STATUS.ARRIVED_FINAL_STATION, GOODS_STATUS.COMPLETED])
  status: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  goodsIds: Types.ObjectId[];

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busScheduleId: Types.ObjectId;
}
