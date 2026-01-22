import { CounterDocument } from '@/module/core/counter/schema/counter.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DriverCounterService {
  constructor(@InjectModel(CounterDocument.name) private readonly counterModel: Model<CounterDocument>) {}
}
