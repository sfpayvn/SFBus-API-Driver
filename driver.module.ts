import { Module } from '@nestjs/common';
import { DriverPaymentModule } from './driver-payment/driver-payment.module';
import { DriverBookingModule } from './driver-booking/driver-booking.module';
import { BusTypeModule } from '../core/bus/bus-type/bus-type.module';
import { DriverBusScheduleLayoutModule } from './driver-bus/driver-bus-schedule-layout/driver-bus-schedule-layout.module';
import { DriverBusScheduleTemplateModule } from './driver-bus/driver-bus-schedule-template/driver-bus-schedule-template.module';
import { DriverBusLayoutTemplateModule } from './driver-bus/driver-bus-layout-template/driver-bus-layout-template.module';
import { DriverBusProvinceModule } from './driver-bus/driver-bus-province/driver-bus-province.module';
import { DriverBusRouteModule } from './driver-bus/driver-bus-route/driver-bus-route.module';
import { DriverBusScheduleModule } from './driver-bus/driver-bus-schedule/driver-bus-schedule.module';
import { DriverBusServiceModule } from './driver-bus/driver-bus-service/driver-bus-service.module';
import { DriverBusTemplateModule } from './driver-bus/driver-bus-template/driver-bus-template.module';
import { DriverBusTypeModule } from './driver-bus/driver-bus-type/driver-bus-type.module';
import { DriverCounterModule } from './driver-counter/driver-counter.module';
import { DriverNotificationModule } from './driver-notification/driver-notification.module';
import { DriverPromotionModule } from './driver-promotion/driver-promotion.module';
import { DriverDriverModule } from './driver-user/driver-driver/driver-driver.module';
import { DriverUserModule } from './driver-user/driver-user-main/driver-user.module';
import { DriverBusStationModule } from './driver-bus/driver-bus-station/driver-bus-station.module';
import { DriverTenantSubscriptionModule } from './driver-tenant-subscription/driver-tenant-subscription.module';
import { DriverAuthRescueModule } from './driver-auth/driver-auth-rescue/driver-auth-rescue.module';
import { DriverAuthModule } from './driver-auth/driver-auth/driver-auth.module';
import { DriverFileModule } from './driver-file/driver-file-main/driver-file.module';
import { DriverSeatTypeModule } from './driver-seat/driver-seat-type/driver-seat-type.module';
import { DriverPaymentMethodModule } from './driver-payment-method/driver-payment-method.module';
import { DriverSettingsModule } from './driver-settings/driver-settings.module';
import { DriverReportModule } from './driver-report/driver-report.module';
import { DriverGoodsModule } from './driver-goods/driver-goods/driver-goods.module';
import { DriverTenantModule } from './driver-tenant/driver-tenant.module';
import { DriverTrackingModule } from './driver-tracking/driver-tracking.module';

@Module({
  imports: [
    DriverAuthModule,
    DriverBusTypeModule,
    BusTypeModule,
    DriverBusProvinceModule,
    DriverBusStationModule,
    DriverBusServiceModule,
    DriverFileModule,
    DriverBusRouteModule,
    DriverBusScheduleModule,
    DriverBusScheduleTemplateModule,
    DriverBusScheduleLayoutModule,
    DriverBusLayoutTemplateModule,
    DriverUserModule,
    DriverBusTemplateModule,
    DriverSeatTypeModule,
    DriverBookingModule,
    DriverPaymentModule,
    DriverNotificationModule,
    DriverCounterModule,
    DriverDriverModule,
    DriverGoodsModule,
    DriverPromotionModule,
    DriverAuthRescueModule,
    DriverTenantSubscriptionModule,
    DriverPaymentMethodModule,
    DriverSettingsModule,
    DriverReportModule,
    DriverTenantModule,
    DriverTrackingModule,
  ],
  exports: [
    DriverAuthModule,
    DriverBusTypeModule,
    DriverBusProvinceModule,
    DriverBusStationModule,
    DriverBusServiceModule,
    DriverFileModule,
    DriverBusRouteModule,
    DriverBusScheduleModule,
    DriverBusScheduleTemplateModule,
    DriverBusScheduleLayoutModule,
    DriverBusLayoutTemplateModule,
    DriverUserModule,
    DriverBusTemplateModule,
    DriverSeatTypeModule,
    DriverBookingModule,
    DriverPaymentModule,
    DriverNotificationModule,
    DriverCounterModule,
    DriverDriverModule,
    DriverGoodsModule,
    DriverPromotionModule,
    DriverAuthRescueModule,
    DriverTenantSubscriptionModule,
    DriverPaymentMethodModule,
    DriverSettingsModule,
    DriverReportModule,
    DriverTenantModule,
    DriverTrackingModule,
  ],
})
export class DriverModule {}
