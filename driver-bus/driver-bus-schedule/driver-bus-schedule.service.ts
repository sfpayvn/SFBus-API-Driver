// src/bus-schedule/bus-schedule.service.ts
import { BusScheduleService } from '@/module/core/bus/bus-schedule/bus-schedule.service';
import { BusScheduleDocument } from '@/module/core/bus/bus-schedule/schema/bus-schedule.schema';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { customAlphabet } from 'nanoid';
import { DriverBusScheduleDto, DriverSearchBusSchedulePagingQuerySortFilter } from './dto/driver-bus-schedule.dto';

@Injectable()
export class DriverBusScheduleService {
  constructor(
    @InjectModel(BusScheduleDocument.name) private busScheduleModel: Model<BusScheduleDocument>,
    @Inject(forwardRef(() => BusScheduleService)) private readonly busScheduleService: BusScheduleService,
  ) {}

  async findAll(tenantId: Types.ObjectId): Promise<DriverBusScheduleDto[]> {
    return this.busScheduleService.findAll(tenantId);
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverBusScheduleDto> {
    return this.busScheduleService.findOne(id, tenantId);
  }

  async searchBusScheduleByDriver(
    keyword: string,
    sortBy: DriverSearchBusSchedulePagingQuerySortFilter,
    filters: DriverSearchBusSchedulePagingQuerySortFilter[],
    driverId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<DriverBusScheduleDto[]> {
    return this.busScheduleService.searchBusScheduleByDriver(keyword, sortBy, filters, driverId, tenantId);
  }

  async updateCurrentStation(
    busScheduleId: Types.ObjectId,
    currentStationId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<DriverBusScheduleDto> {
    return this.busScheduleService.updateCurrentStation(busScheduleId, currentStationId, tenantId);
  }
}
