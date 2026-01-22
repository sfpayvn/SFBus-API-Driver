import { IsString, IsDate } from 'class-validator';
import { DriverNotificationDto } from './driver-notification.dto';
import { OmitType } from '@nestjs/mapped-types';

export class DriverCreateNotificationDto extends OmitType(DriverNotificationDto, [
  '_id',
  'createdAt',
  'updatedAt',
  '__v',
] as const) {}
