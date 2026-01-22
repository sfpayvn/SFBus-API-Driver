import { PartialType } from '@nestjs/mapped-types';
import { DriverCreateSettingDto } from './driver-create-setting.dto';
import { Types } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export class DriverUpdateSettingDto extends PartialType(DriverCreateSettingDto) {
  @IsNotEmpty()
  _id: Types.ObjectId;
}
