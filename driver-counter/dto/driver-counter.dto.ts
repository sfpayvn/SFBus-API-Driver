import { Exclude, Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class PaymentDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  seatCounter: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}
