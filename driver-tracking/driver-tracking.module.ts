import { Module } from '@nestjs/common';
import { DriverTrackingController } from './driver-tracking.controller';
import { DriverTrackingService } from './driver-tracking.service';
import { TrackingModule } from '@/module/core/tracking/tracking.module';

@Module({
  imports: [TrackingModule],
  controllers: [DriverTrackingController],
  providers: [DriverTrackingService],
  exports: [DriverTrackingService],
})
export class DriverTrackingModule {}
