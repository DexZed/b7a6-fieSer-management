import { Controller, Get, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { Roles } from './common/guard/roles.decorator.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @AllowAnonymous()
  @Get()
  @Roles()
  getHello(): string {
    return this.appService.getHello();
  }
}
