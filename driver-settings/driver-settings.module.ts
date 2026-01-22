import { Module } from '@nestjs/common';
import { DriverSettingsController } from './driver-settings.controller';
import { SettingsModule } from '../../core/settings/settings.module';

@Module({
  imports: [SettingsModule],
  controllers: [DriverSettingsController],
})
export class DriverSettingsModule {}
