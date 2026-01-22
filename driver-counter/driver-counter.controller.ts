import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverCounterService } from './driver-counter-service';

@Controller('driver/counter')
export class DriverCounterController {
  constructor(private readonly DriverCounterService: DriverCounterService) {}
}
