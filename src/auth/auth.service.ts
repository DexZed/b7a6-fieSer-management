import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { SignInDto } from '../../dist/auth/dto/create-auth.dto.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async register(userRegs: CreateAuthDto) {
    // TODO: Check if user already exists in db
    // TODO: Hash user password
    // TODO: Save user to db
    return {
      userRegs,
    };
  }
  async signIn(userInfo: SignInDto): Promise<{ access_token: string }> {
    // TODO: Find and check user existence in db

    const payload = { id: 'id', email: 'email', role: 'role' }; // modify this later with actual db data
    // TODO: Generate JWT

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
