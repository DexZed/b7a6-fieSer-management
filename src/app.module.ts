import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SubjectsModule } from './subjects/subjects.module.js';
import { DatabaseModule } from './database/database.module.js';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation.js';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth.js';
@Module({
  imports: [
    AuthModule.forRoot({ auth }),
    SubjectsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
