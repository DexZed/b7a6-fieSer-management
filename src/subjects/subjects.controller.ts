import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Query,
  Param,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('subjects')
@AllowAnonymous()
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('department') department?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.subjectsService.findAll(search, department, page, limit);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    body: {
      departmentId: number;
      name: string;
      code: string;
      description?: string;
    },
  ) {
    return this.subjectsService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(Number(id));
  }

  @Get(':id/classes')
  async findClasses(
    @Param('id') id: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.subjectsService.findClasses(Number(id), page, limit);
  }

  @Get(':id/users')
  async findUsers(
    @Param('id') id: string,
    @Query('role') role: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.subjectsService.findUsers(Number(id), role, page, limit);
  }
}
