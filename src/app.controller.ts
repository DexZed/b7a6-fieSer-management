import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import type { Response as ExpressResponse } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AllowAnonymous()
  @Get('/test')
  test() {
    return { data: 'hello world' };
  }
}
