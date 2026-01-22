// notification.module.ts
import { NotificationDocument, NotificationSchema } from '@/module/core/notification/schema/notificationschema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverNotificationController } from './driver-notification.controller';
import { DriverNotificationGateway } from './driver-notification.gateway';
import { DriverNotificationService } from './driver-notification.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: NotificationDocument.name, schema: NotificationSchema }])],
  controllers: [DriverNotificationController],
  providers: [DriverNotificationService, DriverNotificationGateway],
  exports: [DriverNotificationService], // Export DriverNotificationService d? c�c module kh�c c� th? s? d?ng
})
export class DriverNotificationModule {}
