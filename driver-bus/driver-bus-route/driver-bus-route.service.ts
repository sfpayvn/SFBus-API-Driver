import { BusRouteService } from '@/module/core/bus/bus-route/bus-route.service';
import { BusRouteDto } from '@/module/core/bus/bus-route/dto/bus-route.dto';
import { BusRouteDocument } from '@/module/core/bus/bus-route/schema/bus-route.schema';
import { forwardRef, Inject, Injectable, NotFoundException, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  DriverBusRouteDto,
  DriverSearchBusRouteQuerySortFilter,
  DriverSearchBusRouteRes,
} from './dto/driver-bus-route.dto';

@Injectable()
export class DriverBusRouteService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusRouteDocument.name) private readonly busRouteModel: Model<BusRouteDocument>,
    @Inject(forwardRef(() => BusRouteService))
    private readonly busRouteService: BusRouteService,
  ) {}

  async findAll(tenantIds: Types.ObjectId[]): Promise<DriverBusRouteDto[]> {
    return this.busRouteService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<DriverBusRouteDto> {
    return this.busRouteService.findOne(id, tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: DriverSearchBusRouteQuerySortFilter,
    filters: DriverSearchBusRouteQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<DriverSearchBusRouteRes> {
    return this.busRouteService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
