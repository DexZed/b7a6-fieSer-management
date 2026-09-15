import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly configService: ConfigService) {
    // 1. Read from process.env directly since 'this' cannot be used yet
    const dbUrl =
      process.env.DATABASE_URL || configService.get<string>('DATABASE_URL');

    if (!dbUrl) {
      throw new Error('DATABASE_URL not found in environment variables');
    }

    // 2. Call super() first with the adapter configuration
    super({
      adapter: new PrismaPg({ connectionString: dbUrl }),
    });
  }
  async onModuleInit() {
    try {
      await this.$connect();

      await this.$queryRaw`SELECT 1`;

      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
