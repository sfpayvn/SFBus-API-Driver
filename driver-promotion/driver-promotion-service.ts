import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PromotionDocument } from '@/module/core/promotion/schema/promotion.schema';
import { PromotionService } from '@/module/core/promotion/promotion-service';
import { PromotionDto } from '@/module/core/promotion/dto/promotion.dto';
import { DriverRedeemPromotionDto, DriverPromotionDto } from './dto/driver-promotion.dto';

@Injectable()
export class DriverPromotionService {
  constructor(
    @InjectModel(PromotionDocument.name) private readonly promotionModel: Model<PromotionDocument>,
    @Inject(forwardRef(() => PromotionService)) private readonly promotionService: PromotionService,
  ) {}

  async redeem(DriverRedeemPromotionDto: DriverRedeemPromotionDto, tenantId: Types.ObjectId): Promise<boolean> {
    return this.promotionService.redeem(DriverRedeemPromotionDto, tenantId);
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<DriverPromotionDto[]> {
    return this.promotionService.findAll(tenantIds);
  }

  async findOne(id: string, tenantId: Types.ObjectId): Promise<DriverPromotionDto | null> {
    return this.promotionService.findOne(id, tenantId);
  }

  async findAllByRule(
    userId: Types.ObjectId,
    bookingIds: Types.ObjectId[],
    tenantId: Types.ObjectId,
  ): Promise<PromotionDto[]> {
    return this.promotionService.findAllByRule(userId, bookingIds, tenantId);
  }

  async findMassPromotion(tenantId: Types.ObjectId): Promise<DriverPromotionDto[]> {
    return this.promotionService.findMassPromotion(tenantId);
  }
}
