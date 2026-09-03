import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignInDto } from './dto/create-auth.dto.js';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(userInfo: SignInDto): Promise<any> {
    const user = await this.authService.validateUser(userInfo);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
