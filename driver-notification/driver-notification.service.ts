// notification.service.ts
import { NotificationDocument } from '@/module/core/notification/schema/notificationschema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DriverNotificationGateway } from './driver-notification.gateway';

@Injectable()
export class DriverNotificationService {
  constructor(
    @InjectModel(NotificationDocument.name) private notificationModel: Model<NotificationDocument>,
    private readonly DriverNotificationGateway: DriverNotificationGateway,
  ) {}
}
