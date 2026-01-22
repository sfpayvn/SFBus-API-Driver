import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverTenantSubscriptionController } from './driver-tenant-subscription.controller';
import { DriverTenantSubscriptionService } from './driver-tenant-subscription.service';
import { TenantSubscriptionModule } from '@/module/core/tenant-subscription/tenant-subscription.module';

@Module({
  imports: [forwardRef(() => TenantSubscriptionModule)],
  controllers: [DriverTenantSubscriptionController],
  providers: [DriverTenantSubscriptionService],
  exports: [DriverTenantSubscriptionService], // nếu nơi khác cần gọi service này
})
export class DriverTenantSubscriptionModule {}
