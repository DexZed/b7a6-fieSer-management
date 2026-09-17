import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { StatsService } from './stats.service.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('stats')
@AllowAnonymous()
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('overview')
  async getOverview() {
    const data = await this.statsService.getOverview();
    return { data };
  }

  @Get('latest')
  async getLatest(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    const data = await this.statsService.getLatest(limit);
    return { data };
  }

  @Get('charts')
  async getCharts() {
    const data = await this.statsService.getCharts();
    return { data };
  }
}
