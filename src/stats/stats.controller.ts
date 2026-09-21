import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StatsService } from './stats.service.js';
import { RoleGuard } from '../common/guard/role.guard.js';
import { Roles } from '../common/guard/roles.decorator.js';

@Controller('stats')
@UseGuards(RoleGuard)
@Roles('admin')
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
