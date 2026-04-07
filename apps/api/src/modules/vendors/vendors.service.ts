import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';

@Injectable()
export class VendorsService {
  findAll() {
    return {
      items: [],
      message: 'Vendors listing contract ready',
    };
  }

  create(payload: CreateVendorDto) {
    return {
      message: 'Vendor creation contract ready',
      data: payload,
    };
  }
}
