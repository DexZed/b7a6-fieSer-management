import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('departments')
@AllowAnonymous()
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.departmentsService.findAll({ search, page, limit });
  }

  @Post()
  async create(
    @Body()
    body: {
      code: string;
      name: string;
      description?: string;
    },
  ) {
    return this.departmentsService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.findOne(id);
  }

  @Get(':id/subjects')
  async findSubjects(
    @Param('id', ParseIntPipe) id: number,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.departmentsService.findSubjects(id, { page, limit });
  }

  @Get(':id/classes')
  async findClasses(
    @Param('id', ParseIntPipe) id: number,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.departmentsService.findClasses(id, { page, limit });
  }

  @Get(':id/users')
  async findUsers(
    @Param('id', ParseIntPipe) id: number,
    @Query('role') role: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.departmentsService.findUsers(id, role, { page, limit });
  }
}
