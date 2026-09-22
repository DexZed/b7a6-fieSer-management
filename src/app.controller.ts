import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('classroom')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AllowAnonymous()
  @Get('test')
  @ApiOperation({ summary: 'Test' })
  test(): { data: string } {
    return { data: 'hello world' };
  }
}
