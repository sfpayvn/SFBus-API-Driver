// driver.service.ts

import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DriverDriverDto } from './dto/driver-driver.dto';
import { DriverUpdateDriverDto } from './dto/driver-update-driver.dto';
import { DriverService } from '@/module/core/user/driver/driver.service';
import { DriverDocument } from '@/module/core/user/driver/schema/driver.schema';

@Injectable()
export class DriverDriverService {
  constructor(
    @InjectModel(DriverDocument.name) private driverModel: Model<DriverDocument>,
    @Inject(forwardRef(() => DriverService))
    private readonly driverService: DriverService,
  ) {}

  async update(DriverUpdateDriverDto: DriverUpdateDriverDto, tenantId: Types.ObjectId): Promise<DriverDriverDto> {
    return this.driverService.update(DriverUpdateDriverDto, tenantId);
  }

  async findAllUserDriver(tenantId: Types.ObjectId): Promise<DriverDriverDto[]> {
    return this.driverService.findAllUserDriver(tenantId);
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverDriverDto> {
    return this.driverService.findOne(id, tenantId);
  }

  async findUserDriverByIds(ids: Types.ObjectId[], tenantId: Types.ObjectId): Promise<DriverDriverDto[]> {
    return this.driverService.findUserDriverByIds(ids, tenantId);
  }

  async findOneByUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverDriverDto | null> {
    return this.driverService.findOneByUser(userId, tenantId);
  }
}
