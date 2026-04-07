import { Body, Controller, Get, Post } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Get()
  findAll() {
    return this.vendorsService.findAll();
  }

  @Post()
  create(@Body() payload: CreateVendorDto) {
    return this.vendorsService.create(payload);
  }
}
