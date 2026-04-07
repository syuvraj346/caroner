import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  findAll() {
    return {
      items: [],
      message: 'Users listing contract ready',
    };
  }

  create(payload: CreateUserDto) {
    return {
      message: 'User creation contract ready',
      data: payload,
    };
  }
}
