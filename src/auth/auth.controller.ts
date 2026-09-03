import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Response,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { AuthGuard } from '@nestjs/passport';
import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

import { GoogleAuthGuard } from './guards/goauth.guard.js';
import { RoleGuard } from '../common/guard/role.guard.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

const REFRESH_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async userRegister(@Body() userRegs: CreateAuthDto) {
    return this.authService.register(userRegs);
  }

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async userSignIn(
    @Request() req: ExpressRequest & { user: any },
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const tokens = await this.authService.generateTokens(req.user);

    // Set refresh token in httpOnly cookie
    res.cookie('refresh_token', tokens.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_COOKIE_MAX_AGE,
    });

    return {
      accessToken: tokens.accessToken,
      user: {
        id: req.user.id,
        email: req.user.email,
        fullName: req.user.fullName,
        role: req.user.role,
      },
    };
  }

  // Alias /auth/login according to REST API specification
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async userLogin(
    @Request() req: ExpressRequest & { user: any },
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    return this.userSignIn(req, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshToken(
    @Request() req: ExpressRequest,
    @Body('refreshToken') bodyRefreshToken: string | undefined,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const token = req.cookies?.refresh_token || bodyRefreshToken;
    const result = await this.authService.refreshTokens(token);

    // Update refresh token cookie
    res.cookie('refresh_token', result.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_COOKIE_MAX_AGE,
    });

    return {
      accessToken: result.accessToken,
      user: {
        id: result.user.id,
        email: result.user.email,
        fullName: result.user.fullName,
        role: result.user.role,
      },
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('signOut')
  async userSignOut(@Response({ passthrough: true }) res: ExpressResponse) {
    res.clearCookie('refresh_token', COOKIE_OPTIONS);
    res.clearCookie('access_token', COOKIE_OPTIONS);

    return {
      message: 'User logged out successfully',
    };
  }

  // Self profile endpoint to verify authenticated user and token
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('me')
  getProfile(@Request() req: ExpressRequest & { user: any }) {
    return {
      user: req.user,
    };
  }

  // Google OAuth routes
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('google/redirect')
  async googleRedirect(
    @Request() req: ExpressRequest & { user: any },
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const { user, tokens } = await this.authService.handleOAuthLogin(req.user);

    res.cookie('refresh_token', tokens.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_COOKIE_MAX_AGE,
    });

    return {
      message: 'Google login successful',
      accessToken: tokens.accessToken,
      user,
    };
  }
}
