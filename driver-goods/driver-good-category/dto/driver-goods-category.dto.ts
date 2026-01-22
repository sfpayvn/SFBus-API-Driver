import { Exclude, Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';
import { IsInt } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class DriverGoodsCategoryDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  icon: string;

  @Expose()
  status: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class DriverSearchGoodsCategoryPagingQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class DriverSearchGoodsCategoryPagingQuery {
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
  sortBy: DriverSearchGoodsCategoryPagingQuerySortFilter;

  @IsOptional()
  filters: DriverSearchGoodsCategoryPagingQuerySortFilter[];
}

export class DriverSearchGoodsPagingRes {
  pageIdx: number = 0;
  goodsCategories: DriverGoodsCategoryDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}
