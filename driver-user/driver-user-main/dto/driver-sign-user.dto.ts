import { DriverLoginUserDto } from './driver-login-user.dto';
import { OmitType } from '@nestjs/mapped-types';

export class DriverSignInUserDto extends OmitType(DriverLoginUserDto, ['tenantCode'] as const) {}
