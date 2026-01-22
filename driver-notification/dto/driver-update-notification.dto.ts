import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { DriverCreateNotificationDto } from './driver-create-notificationdto';

export class DriverUpdateNotificationDto extends PartialType(DriverCreateNotificationDto) {
  _id: Types.ObjectId;
}
