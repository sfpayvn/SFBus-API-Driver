import { GoodsDocument, GoodsSchema } from '@/module/core/goods/goods/schema/goods.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverGoodsService } from './driver-goods-service';
import { DriverGoodsController } from './driver-goods.controller';
import { GoodsModule } from '@/module/core/goods/goods/goods.module';
import { DriverTrackingModule } from '../../driver-tracking/driver-tracking.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GoodsDocument.name, schema: GoodsSchema }]),
    forwardRef(() => GoodsModule),
    forwardRef(() => DriverTrackingModule),
  ],
  providers: [DriverGoodsService],
  controllers: [DriverGoodsController],
  exports: [DriverGoodsService],
})
export class DriverGoodsModule {}
