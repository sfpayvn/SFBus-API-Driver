import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, ParseArrayPipe } from '@nestjs/common';
import { SettingsService } from '../../core/settings/settings.service';
import { SettingDto, SearchSettingsRes } from '../../core/settings/dto/setting.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserDto } from '../../core/user/user/dto/user.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('driver/settings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DriverSettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('group/:groupName')
  @Roles(
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  async findByGroup(
    @Param('groupName') groupName: string,
    @CurrentUser(ParseObjectIdPipe) user: UserDto,
  ): Promise<SettingDto[]> {
    return this.settingsService.findByGroupName(groupName, user.tenantId);
  }

  @Get()
  @Roles(
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  async findAll(@CurrentUser() user: UserDto): Promise<SettingDto[]> {
    return this.settingsService.findAll(user.tenantId);
  }

  @Get('name/:name')
  @Roles(
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  async findByName(@Param('name') name: string, @CurrentUser(ParseObjectIdPipe) user: UserDto): Promise<SettingDto> {
    return this.settingsService.findByName(name, user.tenantId);
  }

  @Get(':id')
  @Roles(
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  async findOne(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserDto,
  ): Promise<SettingDto> {
    return this.settingsService.findOne(id, user.tenantId);
  }
}
