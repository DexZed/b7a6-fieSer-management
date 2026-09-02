import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { SignInDto } from '../../dist/auth/dto/create-auth.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  userRegister(@Body() userRegs: CreateAuthDto) {
    return this.authService.register(userRegs);
  }
  @Post('signIn')
  userSignIn(@Body() userInfo: SignInDto) {
    return this.authService.signIn(userInfo);
  }
}
