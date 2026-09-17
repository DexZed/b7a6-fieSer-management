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
@Module({
  imports: [
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
  providers: [AppService],
})
export class AppModule {}
