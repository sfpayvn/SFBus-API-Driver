import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class DriverUpdateDriverDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  userId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  licenseNumber: string;

  @IsNotEmpty()
  @Type(() => Date)
  licenseExpirationDate: Date;

  @IsNotEmpty()
  @Type(() => String)
  licenseType: string;

  @IsNotEmpty()
  @Type(() => String)
  licenseImage: string;
}
