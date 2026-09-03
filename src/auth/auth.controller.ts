import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateAuthDto, SignInDto } from './dto/create-auth.dto.js';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  userRegister(@Body() userRegs: CreateAuthDto) {
    return this.authService.register(userRegs);
  }
  @UseGuards(AuthGuard('local'))
  @Post('signIn')
  userSignIn(@Body() userInfo: SignInDto) {
    return this.authService.signIn(userInfo);
  }
  @Post('signOut')
  userSignOut(@Request() req: any) {
    return this.authService.logOut(req);
  }
}
