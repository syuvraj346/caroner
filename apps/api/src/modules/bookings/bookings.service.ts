import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  findAll() {
    return {
      items: [],
      message: 'Bookings listing contract ready',
    };
  }

  create(payload: CreateBookingDto) {
    return {
      message: 'Booking creation contract ready',
      data: payload,
    };
  }
}
