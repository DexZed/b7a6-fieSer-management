import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy.js';
import { JwtStrategy } from './strategy/jwt.secret.strategy.js';
import { GoogleOauthStrategy } from './strategy/goauth.strategy.js';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule, PassportModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService?.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '60s' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleOauthStrategy],
})
export class AuthModule {}
