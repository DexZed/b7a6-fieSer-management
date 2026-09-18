import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import type { Response as ExpressResponse } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AllowAnonymous()
  @Get()
  root(@Res() res: ExpressResponse) {
    return res.render('index', { message: 'Hello world!' });
  }
}
