import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RequestOtpDto } from './dto/request-otp.dto';

@Injectable()
export class AuthService {
  login(payload: LoginDto) {
    return {
      message: 'Login contract ready',
      email: payload.email,
      authMode: 'email-password',
    };
  }

  requestOtp(payload: RequestOtpDto) {
    return {
      message: 'OTP request contract ready',
      phoneNumber: payload.phoneNumber,
      authMode: 'otp',
    };
  }
}
