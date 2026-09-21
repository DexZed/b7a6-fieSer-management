import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { EnrolmentsService } from './enrolments.service.js';
import { CreateEnrollmentDto, JoinEnrollmentDto } from './dto/enrolment.dto.js';
import { RoleGuard } from '../common/guard/role.guard.js';
import { Roles } from '../common/guard/roles.decorator.js';

@Controller('enrolments')
@UseGuards(RoleGuard)
@Roles('student')
export class EnrolmentsController {
  constructor(private readonly enrolmentsService: EnrolmentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    const enrollment = await this.enrolmentsService.create(createEnrollmentDto);
    return { data: enrollment };
  }

  @Post('join')
  @HttpCode(HttpStatus.CREATED)
  async join(@Body() joinEnrollmentDto: JoinEnrollmentDto) {
    const enrollment =
      await this.enrolmentsService.joinByInviteCode(joinEnrollmentDto);
    return { data: enrollment };
  }
}
