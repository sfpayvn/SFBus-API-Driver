import { CounterDocument, CounterSchema } from '@/module/core/counter/schema/counter.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverCounterService } from './driver-counter-service';

@Module({
  imports: [MongooseModule.forFeature([{ name: CounterDocument.name, schema: CounterSchema }])],
  providers: [DriverCounterService],
  exports: [DriverCounterService],
})
export class DriverCounterModule {}
