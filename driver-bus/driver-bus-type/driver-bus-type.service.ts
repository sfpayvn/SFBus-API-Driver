import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BusTypeDocument } from '@/module/core/bus/bus-type/schema/bus-type.schema';
import { BusTypeService } from '@/module/core/bus/bus-type/bus-type.service';
import {
  DriverBusTypeDto,
  DriverSearchBusTypesQuerySortFilter,
  DriverSearchBusTypesRes,
} from './dto/driver-bus-type.dto';

@Injectable()
export class DriverBusTypeService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusTypeDocument.name) private readonly busTypeModel: Model<BusTypeDocument>,
    @Inject(forwardRef(() => BusTypeService))
    private readonly busTypeService: BusTypeService,
  ) {}

  async findAll(tenantIds: Types.ObjectId[]): Promise<DriverBusTypeDto[]> {
    return this.busTypeService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<DriverBusTypeDto> {
    return this.busTypeService.findOne(id, tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: DriverSearchBusTypesQuerySortFilter,
    filters: DriverSearchBusTypesQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<DriverSearchBusTypesRes> {
    return this.busTypeService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
