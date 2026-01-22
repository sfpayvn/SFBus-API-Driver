import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DriverFileService } from './driver-file.service';
import { DriverUploadController } from './driver-file.controller';
import { FileDocument, FileSchema } from '@/module/core/file/file/schema/file.schema';
import { FileModule } from '@/module/core/file/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: FileDocument.name, schema: FileSchema }]),
    forwardRef(() => FileModule),
  ],
  providers: [DriverFileService],
  controllers: [DriverUploadController],
})
export class DriverFileModule {}
