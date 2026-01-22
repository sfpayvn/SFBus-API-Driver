import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class DriverCreatePaymentDto {
  tenantId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  bookingId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  bookingNumber: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  userId: Types.ObjectId;

  @IsOptional()
  @Type(() => Types.ObjectId)
  promotionId?: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  paymentMethodId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  paymentNumber: string;

  @IsNotEmpty()
  @Type(() => String)
  status: string;

  @IsNotEmpty()
  @Type(() => Number)
  paymentAmount: number; // Số tiền khách trả

  @IsNotEmpty()
  @Type(() => Number)
  chargedAmount: number;

  @IsOptional()
  @Type(() => String)
  transactionReferrentId: string;
}
