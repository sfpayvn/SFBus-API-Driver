import { GoodsDocument } from '@/module/core/goods/goods/schema/goods.schema';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { GoodsDto } from '@/module/core/goods/goods/dto/goods.dto';
import { GoodsService } from '@/module/core/goods/goods/goods-service';
import { DriverGoodsSortFilter } from './dto/driver-goods.dto';
import { GOODS_STATUS } from '@/common/constants/status.constants';
import { PosGoodsDto } from '@/module/pos/pos-goods/pos-goods/dto/pos-goods.dto';
import { DriverRequestUpdateGoodsBoardingDto } from './dto/driver-update-goods.dto';
import { plainToInstance } from 'class-transformer';
import { TRACKING_TYPES } from '@/module/core/tracking/constants/tracking-types';
import { DriverTrackingService } from '../../driver-tracking/driver-tracking.service';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Injectable()
export class DriverGoodsService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(GoodsDocument.name) private readonly goodsModel: Model<GoodsDocument>,
    @Inject(forwardRef(() => GoodsService))
    private readonly goodsService: GoodsService,
    @Inject(forwardRef(() => DriverTrackingService))
    private readonly driverTrackingService: DriverTrackingService,
  ) {}

  async findAllGoodsForBusSchedule(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<GoodsDto[]> {
    const filters: DriverGoodsSortFilter[] = [];

    const filterByStatus = {
      key: 'status',
      value: [
        GOODS_STATUS.PENDING,
        GOODS_STATUS.ON_BOARD,
        GOODS_STATUS.ARRIVED_FINAL_STATION,
        GOODS_STATUS.OUT_FOR_DELIVERY,
        GOODS_STATUS.COMPLETED,
      ],
    };

    filters.push(filterByStatus);
    return this.goodsService.findAllGoodsForBusSchedule(busScheduleId, tenantId, filters);
  }

  async findOne(id: string, tenantId: Types.ObjectId) {
    return this.goodsService.findOne(id, tenantId);
  }

  async updateGoodsScheduleBoarding(
    driverRequestUpdateGoodsBoardingDto: DriverRequestUpdateGoodsBoardingDto,
    tenantId: Types.ObjectId,
    updatedBy: Types.ObjectId,
  ): Promise<GoodsDto[]> {
    const goodses = await this.goodsService.updatesGoodsBoarding(driverRequestUpdateGoodsBoardingDto, tenantId);
    // Tạo tracking cho từng goods
    for (const goodsDto of goodses) {
      await this.driverTrackingService.create(
        {
          type: TRACKING_TYPES.GOODS_BOARDING,
          platform: ROLE_CONSTANTS.POS,
          metadata: {
            goodsId: goodsDto._id,
            goodsName: goodsDto.name,
            busRouteId: goodsDto.busRouteId,
            busScheduleId: goodsDto.busScheduleId,
            status: goodsDto.status,
          },
          createdBy: updatedBy,
        },
        tenantId,
      );
    }

    return goodses;
  }
}
