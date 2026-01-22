import { Types } from 'mongoose';
import { DriverBusLayoutTemplateDto } from '../../driver-bus-layout-template/dto/driver-bus-layout-template.dto';

export class DriverBusScheduleLayoutSeatDto {
  _id: Types.ObjectId;
  bookingId: Types.ObjectId;
  index: number;
  typeId: Types.ObjectId;
  name: string;
  status: string;
  bookingStatus: string;
}

export class DriverBusScheduleSeatLayoutTemplateDto {
  _id: Types.ObjectId;
  name: string;
  seats: DriverBusScheduleLayoutSeatDto[];
}

export class DriverBusScheduleLayoutDto extends DriverBusLayoutTemplateDto {
  busLayoutTemplateId: Types.ObjectId;
  busScheduleId: Types.ObjectId;
  seatLayouts: DriverBusScheduleSeatLayoutTemplateDto[];
}

export class DriverRequestUpdateSeatStatusDto {
  _id: Types.ObjectId;
  status: string;
  bookingStatus?: string;
  bookingId?: Types.ObjectId;
}
