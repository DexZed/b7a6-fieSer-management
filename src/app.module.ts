import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SubjectsModule } from './subjects/subjects.module.js';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation.js';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth.js';
import { UsersModule } from './users/users.module.js';
import { ClassesModule } from './classes/classes.module.js';
import { DepartmentsModule } from './departments/departments.module.js';
import { EnrolmentsModule } from './enrolments/enrolments.module.js';
import { StatsModule } from './stats/stats.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
const __dirname = dirname(fileURLToPath(import.meta.url));

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/{*path}'],
    }),
    AuthModule.forRoot({ auth }),
    SubjectsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    UsersModule,
    ClassesModule,
    DepartmentsModule,
    EnrolmentsModule,
    StatsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
  ],
})
export class AppModule {}
