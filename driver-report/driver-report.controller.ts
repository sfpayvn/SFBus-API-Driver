import { Controller, UseGuards } from '@nestjs/common';
import { ReportService } from '../../core/report/report.service';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';

@Controller('driver/report')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DriverReportController {
  constructor(private readonly reportService: ReportService) {}
}
