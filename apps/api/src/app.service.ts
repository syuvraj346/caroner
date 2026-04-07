import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot() {
    return {
      name: 'CarOner API',
      status: 'ok',
      message: 'CarOner backend is running',
      docsPlanned: true,
      modules: ['health', 'auth', 'users', 'vehicles', 'vendors', 'bookings'],
    };
  }

  getVersion() {
    return {
      service: 'caroner-api',
      version: '0.1.0',
      phase: 'foundation',
    };
  }
}
