import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { EnrolmentsService } from './enrolments.service.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { CreateEnrollmentDto, JoinEnrollmentDto } from './dto/enrolment.dto.js';

@Controller('enrolments')
@AllowAnonymous()
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
