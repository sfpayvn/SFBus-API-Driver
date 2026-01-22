import { SeatTypeDocument } from '@/module/core/seat/seat-type/schema/seat-type.schema';
import { SeatTypeService } from '@/module/core/seat/seat-type/seat-type.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  DriverSeatTypeDto,
  DriverSearchSeatTypesQuerySortFilter,
  DriverSearchSeatTypeRes,
} from './dto/driver-seat-type.dto';

@Injectable()
export class DriverSeatTypeService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(SeatTypeDocument.name) private readonly seatTypeModel: Model<SeatTypeDocument>,
    @Inject(forwardRef(() => SeatTypeService))
    private readonly seatTypeService: SeatTypeService,
  ) {}

  async findAll(tenantIds: Types.ObjectId[]): Promise<DriverSeatTypeDto[]> {
    return this.seatTypeService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<DriverSeatTypeDto> {
    return this.seatTypeService.findOne(id, tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: DriverSearchSeatTypesQuerySortFilter,
    filters: DriverSearchSeatTypesQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<DriverSearchSeatTypeRes> {
    return this.seatTypeService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
    //// map xem c�i n�o thu?c tenant trong token c�i n�o thu?c teant default trong settings

    ///tenant trong setting th� filed isdefault = true
    /// tenant trong token th� field isdefault = false
    /// khi t�m ki?m th� t�m c? 2 lo?i
    /// khi t?o, s?a, x�a th� ch? dc thao t�c v?i lo?i tenant trong token (isdefault = false)
    /// khi l?y chi ti?t cung ch? dc l?y chi ti?t c?a lo?i tenant trong token (isdefault = false)
    /// khi l?y all cung ch? dc l?y all c?a lo?i tenant trong token (isdefault = false)
    // n?u isDefault = true th� kh�ng tr? tenantId v? client

    /// vi?t intercetor d? check update cho c�c api create, update, delete, findOne xem c� d�ng tenant trong token v� kh�ng ph?i tenant default trong settings (isdefault = true) n?u d�ng th� cho ph�p thao t�c, kh�ng th� throw l?i
    /// vi?t intercetor d? map l?i response cho c�c api findOne, findAll, search n?u isdefault = true th� kh�ng tr? tenantId v? client
  }
}
