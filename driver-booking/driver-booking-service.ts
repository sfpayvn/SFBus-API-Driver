import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { BOOKING_STATUS } from '@/common/constants/status.constants';
import { DriverBookingGateway } from './driver-booking.gateway';
import { BookingDocument } from '@/module/core/booking/schema/booking.schema';
import { BookingService } from '@/module/core/booking/booking-service';
import { DriverTrackingService } from '../driver-tracking/driver-tracking.service';
import { TRACKING_TYPES } from '@/module/core/tracking/constants/tracking-types';
import {
  DriverBookingDto,
  DriverBookingItemDto,
  DriverBookingSortFilter,
  DriverSearchBookingPagingRes,
} from './dto/driver-booking.dto';
import { plainToInstance } from 'class-transformer';
import { DriverPaymentService } from '../driver-payment/driver-payment-service';
import { BookingDto, BookingItemDto } from '@/module/core/booking/dto/booking.dto';
import { DriverCreateBookingDto } from './dto/driver-create-booking.dto';
import {
  DriverRequestUpdateBookingItemBoardingDto,
  DriverUpdateBookingDto,
  DriverUpdateBookingItemDto,
} from './dto/driver-update-booking.dto';
import { UpdateBookingDto } from '@/module/core/booking/dto/update-booking.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Injectable()
export class DriverBookingService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(BookingDocument.name) private readonly bookingModel: Model<BookingDocument>,
    @Inject(forwardRef(() => BookingService)) private readonly bookingService: BookingService,
    @Inject(forwardRef(() => DriverPaymentService)) private readonly DriverPaymentService: DriverPaymentService,
    private readonly driverTrackingService: DriverTrackingService,
    private DriverBookingGateway: DriverBookingGateway,
  ) {}

  async findAllByScheduleId(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverBookingDto[]> {
    const filters: DriverBookingSortFilter[] = [];

    const filterByStatus = {
      key: 'status',
      value: [BOOKING_STATUS.RESERVED, BOOKING_STATUS.PAID, BOOKING_STATUS.DEPOSITED, BOOKING_STATUS.COMPLETED],
    };

    filters.push(filterByStatus);

    return this.bookingService.findAllByScheduleId(busScheduleId, tenantId, filters);
  }

  async findOneBookingsByBookingItemId(bookingId: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverBookingDto> {
    return this.bookingService.findOneBookingsByBookingItemId(bookingId, tenantId);
  }

  async updateBookingItem(
    busScheduleId: Types.ObjectId,
    driverUpdateBookingItemDto: DriverUpdateBookingItemDto,
    tenantId: Types.ObjectId,
    updatedBy: Types.ObjectId,
  ): Promise<DriverBookingItemDto> {
    const bookingItem = (await this.bookingService.updateBookingItem(
      busScheduleId,
      driverUpdateBookingItemDto,
      tenantId,
    )) as any;

    // Log tracking for booking item update
    if (updatedBy) {
      const changes = bookingItem._oldData
        ? this.prepareChanges(driverUpdateBookingItemDto, bookingItem._oldData)
        : null;

      await this.driverTrackingService.create(
        {
          type: TRACKING_TYPES.BOOKING_UPDATED,
          platform: ROLE_CONSTANTS.DRIVER,
          metadata: {
            busScheduleId,
            bookingItemId: driverUpdateBookingItemDto._id,
            seatStatus: driverUpdateBookingItemDto.seat?.status,
            action: 'update_booking_item',
            oldValue: bookingItem._oldData ? JSON.stringify(bookingItem._oldData) : null,
            newValue: JSON.stringify(bookingItem),
            changes: changes ? JSON.stringify(changes) : null,
            updatedFields: changes ? Object.keys(changes) : [],
          },
          createdBy: updatedBy,
        },
        tenantId,
      );
    }

    // Remove internal _oldData before returning to caller
    if (bookingItem && bookingItem._oldData) delete bookingItem._oldData;
    return bookingItem as DriverBookingItemDto;
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto> {
    const bookingModel = await this.bookingModel.findOne({ _id: id, tenantId }).lean().exec();
    return plainToInstance(BookingDto, bookingModel);
  }

  async findAllByPaymentNumber(paymentNumber: string, tenantId: Types.ObjectId): Promise<DriverBookingDto[]> {
    const bookings = await this.bookingModel.find({ paymentNumber, tenantId }).lean().exec();
    return plainToInstance(DriverBookingDto, bookings);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: DriverBookingSortFilter,
    filters: DriverBookingSortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<DriverSearchBookingPagingRes> {
    return this.bookingService.search(
      pageIdx,
      pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    ) as Promise<DriverSearchBookingPagingRes>;
  }

  private prepareChanges(updateDto: any, oldData: any): Record<string, { oldValue: any; newValue: any }> {
    const changes: Record<string, { oldValue: any; newValue: any }> = {};
    Object.keys(updateDto).forEach((key) => {
      if (key !== '_id' && oldData && oldData[key] !== undefined) {
        const oldValue = oldData[key];
        const newValue = updateDto[key];
        if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
          changes[key] = {
            oldValue,
            newValue,
          };
        }
      }
    });
    return changes;
  }

  async updateBookingItemBoarding(
    driverRequestUpdateBookingItemBoardingDto: DriverRequestUpdateBookingItemBoardingDto,
    tenantId: Types.ObjectId,
    updatedBy: Types.ObjectId,
  ): Promise<(BookingItemDto & { _oldData?: any })[]> {
    const bookingItems = await this.bookingService.updateBookingItemBoarding(
      driverRequestUpdateBookingItemBoardingDto.busScheduleId,
      driverRequestUpdateBookingItemBoardingDto.bookingItemIds,
      driverRequestUpdateBookingItemBoardingDto.status,
      tenantId,
    );

    if (updatedBy) {
      // Log tracking for each booking item updated
      for (const bookingItem of bookingItems) {
        const changes = bookingItem._oldData
          ? this.prepareChanges(driverRequestUpdateBookingItemBoardingDto, bookingItem._oldData)
          : null;

        await this.driverTrackingService.create(
          {
            type: TRACKING_TYPES.BOOKING_UPDATED,
            platform: ROLE_CONSTANTS.DRIVER,
            metadata: {
              busScheduleId: driverRequestUpdateBookingItemBoardingDto.busScheduleId,
              bookingItemIds: driverRequestUpdateBookingItemBoardingDto.bookingItemIds,
              seatStatus: driverRequestUpdateBookingItemBoardingDto?.status,
              action: 'update_booking_item',
              oldValue: bookingItem._oldData ? JSON.stringify(bookingItem._oldData) : null,
              newValue: JSON.stringify(bookingItem),
              changes: changes ? JSON.stringify(changes) : null,
              updatedFields: changes ? Object.keys(changes) : [],
            },
            createdBy: updatedBy,
          },
          tenantId,
        );
      }
    }

    // Remove internal _oldData before returning to caller
    return bookingItems.map((item) => {
      if (item && item._oldData) delete item._oldData;
      return item;
    });
  }
}
