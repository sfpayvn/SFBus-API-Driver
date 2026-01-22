import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Type,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverUserService } from './driver-user.service';
import { DriverCreateUserAddressDto, DriverCreateUserDto } from './dto/driver-create-user.dto';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { SearchUsersTypesQuery, UserDto } from '@/module/core/user/user/dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { StripFields } from '@/interceptors/strip-fields.interceptor';
import { DriverRequestUpdateUserFieldDto, DriverSearchUsersTypesQuery } from './dto/driver-user.dto';
import { Feature } from '@/decorators/feature.decorator';
import { Roles } from '@/decorators/roles.decorator';
import { RolesGuard } from '@/guards/roles.guard';
import { UpdatePasswordUserDto } from '@/module/core/user/user/dto/update-user.dto';
import { DriverUpdateUserDto, DriverUpdateUserProfileDto } from './dto/driver-update-user.dto';
import { Types } from 'mongoose';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('driver/users')
export class DriverUserController {
  constructor(private driverUserService: DriverUserService) {}

  // Endpoint cập nhật thông tin ngư�i dùng
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @UseInterceptors(StripFields(['password']))
  @Put('profile')
  async updateProfile(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Body(ParseObjectIdPipe) driverUpdateUserProfileDto: DriverUpdateUserProfileDto,
  ) {
    try {
      const { tenantId } = user;
      const updatedUser = await this.driverUserService.update(driverUpdateUserProfileDto, tenantId);
      return updatedUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Post('update-user-field')
  async updateUserField(
    @Body(ParseObjectIdPipe) DriverRequestUpdateUserFieldDto: DriverRequestUpdateUserFieldDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id } = user;
    const { fieldName, value } = DriverRequestUpdateUserFieldDto;
    return this.driverUserService.updateUserField(_id, fieldName, value, tenantId);
  }
}
