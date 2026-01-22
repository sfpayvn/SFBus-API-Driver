import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { DriverUserDto } from '../../driver-user-main/dto/driver-user.dto';

export class DriverDriverDto extends DriverUserDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  userId: Types.ObjectId;

  @Expose()
  licenseNumber: string;

  @Expose()
  licenseExpirationDate: Date;

  @Expose()
  licenseType: string;

  @Expose()
  licenseImage: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class DriverSearchDriversQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class DriverSearchDriversQuery {
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
  sortBy: DriverSearchDriversQuerySortFilter;

  @IsOptional()
  @IsString()
  filters: DriverSearchDriversQuerySortFilter[];
}

export class DriverSearchDriversRes {
  pageIdx: number = 0;
  userDrivers: DriverDriverDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}
