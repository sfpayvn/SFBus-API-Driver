import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { ObjectId, Types } from 'mongoose';

export class DriverFileDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  link: string;

  @Expose()
  filename: string;

  @Expose()
  contentType: string;

  @Expose()
  folderId: Types.ObjectId;

  @Expose()
  isFavorite: boolean;

  @Expose()
  isDefault?: boolean;

  @Exclude()
  uploadDate?: Date;

  @Exclude()
  md5?: string;

  @Exclude()
  length?: number;

  @Exclude()
  chunkSize?: number;

  @Exclude()
  metadata?: any;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  __v?: number;
}

export class DriverSearchFilesQuerySortFilter {
  key: string;
  value: string;
}

export class DriverSearchFilesQuery {
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
  sortBy: DriverSearchFilesQuerySortFilter;

  @IsOptional()
  filters: DriverSearchFilesQuerySortFilter[];

  @IsOptional()
  @IsString()
  fileFolderId: Types.ObjectId | null;
}

export class DriverSearchFilesRes {
  pageIdx: number = 0;
  files: DriverFileDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}
