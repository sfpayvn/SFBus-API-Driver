import { Types } from 'mongoose';
import { OmitType } from '@nestjs/mapped-types';
import { DriverFileDto } from '../../driver-file/driver-file-main/dto/driver-file.dto';

export class DriverCreateCounterDto extends OmitType(DriverFileDto, [
  '_id',
  'createdAt',
  'updatedAt',
  '__v',
] as const) {}
