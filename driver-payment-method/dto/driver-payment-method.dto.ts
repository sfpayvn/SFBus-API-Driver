import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { DriverBookingDto } from '../../driver-booking/dto/driver-booking.dto';

export class DriverPaymentBankingDto {
  @Expose()
  providerId: Types.ObjectId;

  @Expose()
  token: string;

  @Expose()
  bankName: string;

  @Expose()
  accountNumber: string;

  @Expose()
  accountName: string;
}

export class DriverPaymentMethodDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  providerId: Types.ObjectId;

  @Expose()
  token: string;

  @Expose()
  name: string;

  @Expose()
  banking?: DriverPaymentBankingDto;

  @Expose()
  type: string;

  @Expose()
  imageId: Types.ObjectId;

  @Expose()
  image: string;

  @Expose()
  note?: string;

  @Expose()
  status: string;

  @Expose()
  isDefault?: boolean;

  @Expose()
  isPaymentMethodDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class DriverPaymentMethodSortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class DriverSearchPaymentMethodPagingQuery {
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
  sortBy: DriverPaymentMethodSortFilter;

  @IsOptional()
  filters: DriverPaymentMethodSortFilter[];
}

export class DriverSearchPaymentMethodPagingRes {
  pageIdx: number = 0;
  paymentMethods: DriverPaymentMethodDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}
