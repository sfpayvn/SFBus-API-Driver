import { Controller, Get, Post, Body } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverNotificationService } from './driver-notification.service';

@Controller('notifications')
export class DriverNotificationController {
  constructor(private readonly DriverNotificationService: DriverNotificationService) {}
}
