import { Module } from '@nestjs/common';
import { DriverTenantService } from './driver-tenant.service';
import { TenantModule } from '../../core/tenant/tenant.module';

@Module({
  imports: [TenantModule],
  providers: [DriverTenantService],
  exports: [DriverTenantService],
})
export class DriverTenantModule {}
