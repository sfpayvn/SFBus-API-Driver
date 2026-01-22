import { PartialType } from '@nestjs/mapped-types';
import { DriverCreateCounterDto } from './driver-create-counter.dto';

export class DriverUpdateCounterDto extends PartialType(DriverCreateCounterDto) {}
