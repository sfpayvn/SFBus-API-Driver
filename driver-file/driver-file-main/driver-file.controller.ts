import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  StreamableFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Types } from 'mongoose';
import { DriverFileService } from './driver-file.service';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverFileDto, DriverSearchFilesQuery } from './dto/driver-file.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

type Request = FastifyRequest;
type Response = FastifyReply;

@ApiTags('DriverFile')
@Controller('driver/file')
export class DriverUploadController {
  constructor(private readonly DriverFileService: DriverFileService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Post('upload-file/:folderId')
  uploadFile(
    @Param('folderId', ParseObjectIdPipe) folderId: Types.ObjectId,
    @Req() request: Request,
    @CurrentUser(ParseObjectIdPipe) userTokenDto: UserTokenDto,
  ): Promise<DriverFileDto[]> {
    const { tenantId } = userTokenDto;

    return this.DriverFileService.upload(request, folderId, tenantId);
  }

  @ApiOperation({
    summary: 'Get a list of all uploaded files.',
  })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '5e2b447e4aadb800bccfb339' },
          length: { type: 'number', example: 730416 },
          chunkSize: { type: 'number', example: 261120 },
          uploadDate: { type: 'Date', example: '2020-01-24T19:24:46.366Z' },
          filename: { type: 'string', example: 'IMG_0359.jpeg' },
          md5: { type: 'string', example: 'ba230f0322784443c84ffbc5b6160c30' },
          contentType: { type: 'string', example: 'image/jpeg' },
        },
      },
    },
  })
  @ApiOperation({ summary: 'Download a file.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  )
  @Get(':id')
  async downloadFile(
    @Param('id') id: string,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ): Promise<StreamableFile> {
    const { tenantId } = user;
    const file = await this.DriverFileService.download(id, request, response, tenantId);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }

  @ApiOperation({ summary: 'View a file online.' })
  @Get('view/:id')
  viewFile(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ): Promise<StreamableFile> {
    const { tenantId } = user;
    return this.DriverFileService.viewFile(id, response);
  }
}
