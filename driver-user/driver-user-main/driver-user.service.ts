// user.service.ts

import { UserDocument } from '@/module/core/user/user/schema/user.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserService } from '@/module/core/user/user/user.service';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { DriverRequestUpdateUserFieldDto, DriverSearchUsersRes, DriverUserDto } from './dto/driver-user.dto';
import { DriverCreateUserDto } from './dto/driver-create-user.dto';
import {
  DriverUpdatePasswordUserDto,
  DriverUpdateUserDto,
  DriverUpdateUserProfileDto,
} from './dto/driver-update-user.dto';

@Injectable()
export class DriverUserService {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
  ) {}

  async create(DriverCreateUserDto: DriverCreateUserDto, tenantId?: Types.ObjectId): Promise<DriverUserDto> {
    return this.userService.create(DriverCreateUserDto, tenantId);
  }

  // C?p nh?t th�ng tin ngu?i d�ng
  async update(
    driverUpdateUserProfileDto: DriverUpdateUserProfileDto,
    tenantId: Types.ObjectId,
  ): Promise<DriverUserDto> {
    return this.userService.update(driverUpdateUserProfileDto, tenantId);
  }

  async updateUserField(
    userId: Types.ObjectId,
    fieldName: string,
    value: any,
    tenantId: Types.ObjectId,
  ): Promise<DriverUserDto> {
    return this.userService.updateUserField(userId, fieldName, value, tenantId);
  }

  async updatePassword(
    userId: Types.ObjectId,
    DriverUpdatePasswordUserDto: DriverUpdatePasswordUserDto,
    tenantId: Types.ObjectId,
  ): Promise<DriverUserDto> {
    return this.userService.updatePassword(userId, DriverUpdatePasswordUserDto, tenantId);
  }

  // T�m ngu?i d�ng theo ID
  async findById(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverUserDto | null> {
    return this.userService.findById(userId, tenantId);
  }

  async findByIds(userIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<DriverUserDto[] | null> {
    return this.userService.findByIds(userIds, tenantId);
  }

  // T�m ngu?i d�ng theo t�n dang nh?p
  async findByPhoneNumber(phoneNumber: string, tenantId?: Types.ObjectId): Promise<DriverUserDto | null> {
    return this.userService.findByPhoneNumber(phoneNumber, tenantId);
  }

  async findAll(tenantId: Types.ObjectId): Promise<DriverUserDto[]> {
    return this.userService.findAll(tenantId);
  }

  async findAllByRole(role: string, tenantId: Types.ObjectId): Promise<DriverUserDto[]> {
    return this.userService.findAllByRole(role, tenantId);
  }

  async findOne(id: string, tenantId: Types.ObjectId): Promise<DriverUserDto> {
    return this.userService.findOne(id, tenantId);
  }

  async findByPhone(phoneNumber: string, tenantId: Types.ObjectId): Promise<DriverUserDto> {
    return this.userService.findByPhone(phoneNumber, tenantId);
  }

  async findByEmail(email: string, tenantId: Types.ObjectId): Promise<DriverUserDto> {
    return this.userService.findByEmail(email, tenantId);
  }

  async findOneByRole(role: string, tenantId: Types.ObjectId): Promise<DriverUserDto> {
    return this.userService.findOneByRole(role, tenantId);
  }
}
