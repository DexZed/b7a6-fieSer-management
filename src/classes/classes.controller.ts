import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ClassesService } from './classes.service.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { Prisma } from '../generated/prisma/client.js';

@Controller('classes')
@AllowAnonymous()
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}
  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('subject') subject?: string,
    @Query('teacher') teacher?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.classesService.findAll({
      search,
      subject,
      teacher,
      page,
      limit,
    });
  }

  @Post()
  async create(@Body() body: Prisma.ClassCreateInput) {
    return this.classesService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.findOne(id);
  }

  @Get(':id/users')
  async findUsers(
    @Param('id', ParseIntPipe) id: number,
    @Query('role') role: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.classesService.findUsers(id, role, { page, limit });
  }
}
