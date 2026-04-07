import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehiclesService {
  findAll() {
    return {
      items: [],
      message: 'Vehicles listing contract ready',
    };
  }

  create(payload: CreateVehicleDto) {
    return {
      message: 'Vehicle creation contract ready',
      data: payload,
    };
  }
}
