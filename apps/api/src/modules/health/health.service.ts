import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealth() {
    return {
      status: 'ok',
      service: 'caroner-api',
      timestamp: new Date().toISOString(),
    };
  }
}
