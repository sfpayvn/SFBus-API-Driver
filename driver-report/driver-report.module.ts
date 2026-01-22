import { Module } from '@nestjs/common';
import { DriverReportController } from './driver-report.controller';
import { ReportModule } from '../../core/report/report.module';

@Module({
  imports: [ReportModule],
  controllers: [DriverReportController],
})
export class DriverReportModule {}
