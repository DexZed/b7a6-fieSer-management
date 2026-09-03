import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto, SignInDto } from './dto/create-auth.dto.js';

import { JwtService } from '@nestjs/jwt';
import { db } from '../prisma/db.js';
import { comparePassword, hashPassword } from '../utils/crypto.js';
import { checkRecordExistence, saveRecord } from '../utils/genericQuery.js';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async register(userRegs: CreateAuthDto) {
    const userExistence = await checkRecordExistence('User', ['id', 'email'], {
      email: userRegs.email,
    });
    if (userExistence) {
      throw new NotFoundException('User Already Exists');
    }
    const hashUserPassword = hashPassword(userRegs.password);

    const result = await saveRecord('User', {
      email: userRegs.email,
      passwordHash: hashUserPassword,
      role: userRegs.role,
    });
    if (!result) {
      throw new Error('Failed to Save User');
    }
    return {
      userRegs,
    };
  }
  async signIn(userInfo: SignInDto): Promise<{ access_token: string }> {
    const userExistence = await checkRecordExistence(
      'User',
      ['id', 'email', 'passwordHash'],
      { email: userInfo.email },
    );
    if (!userExistence) {
      throw new NotFoundException('User Not Found');
    }
    const payload = {
      id: userExistence.id,
      email: userExistence.email,
      role: userExistence.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async validateUser(userInfo: SignInDto): Promise<any> {
    const user = await db.orm.public.User.select('id', 'passwordHash')
      .where({ email: userInfo.email })
      .first();
    const hashUserPassword = hashPassword(userInfo.password);
    if (user && (await comparePassword(hashUserPassword, userInfo.password))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }
  async logOut(req: any) {
    req.logOut();
    return 'User Logged out successfully';
  }
}
