import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto, Role, SignInDto } from './dto/create-auth.dto.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { db } from '../prisma/db.js';
import { comparePassword, hashPassword } from '../utils/crypto.js';

export interface TokenPayload {
  id: number;
  email: string;
  role: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(userRegs: CreateAuthDto) {
    const existing = await db.orm.public.User.select('id', 'email')
      .where({ email: userRegs.email })
      .first();

    if (existing) {
      throw new UnauthorizedException('User with this email already exists');
    }

    const hashedPassword = hashPassword(userRegs.password);
    const fullName = userRegs.fullName || userRegs.name || 'User';
    const role = (userRegs.role as any) || Role.CUSTOMER;

    const created = await db.orm.public.User.create({
      email: userRegs.email,
      passwordHash: hashedPassword,
      fullName,
      role,
      updatedAt: new Date(),
    });

    return {
      message: 'User registered successfully.',
      user: {
        id: created.id,
        email: created.email,
        fullName: created.fullName,
        role: created.role,
        createdAt: created.createdAt,
      },
    };
  }

  async validateUser(userInfo: SignInDto): Promise<any> {
    const user = await db.orm.public.User.select(
      'id',
      'email',
      'fullName',
      'role',
      'passwordHash',
    )
      .where({ email: userInfo.email })
      .first();

    if (!user) {
      return null;
    }

    const isMatch = await comparePassword(userInfo.password, user.passwordHash);
    if (!isMatch) {
      return null;
    }

    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  async generateTokens(user: { id: number; email: string; role: string }): Promise<AuthTokens> {
    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const jwtSecret =
      this.configService.get<string>('JWT_SECRET') ||
      process.env.JWT_SECRET ||
      'fallbackSecretKey';

    const jwtRefreshSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET') ||
      process.env.JWT_REFRESH_SECRET ||
      jwtSecret;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtSecret,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: jwtRefreshSecret,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshTokenString: string): Promise<AuthTokens & { user: any }> {
    if (!refreshTokenString) {
      throw new UnauthorizedException('Refresh token is required');
    }

    const jwtRefreshSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET') ||
      process.env.JWT_REFRESH_SECRET ||
      this.configService.get<string>('JWT_SECRET') ||
      process.env.JWT_SECRET ||
      'fallbackSecretKey';

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refreshTokenString, {
        secret: jwtRefreshSecret,
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await db.orm.public.User.select(
      'id',
      'email',
      'fullName',
      'role',
    )
      .where({ id: payload.id })
      .first();

    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }

    const tokens = await this.generateTokens(user);
    return {
      ...tokens,
      user,
    };
  }
}
