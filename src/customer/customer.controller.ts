import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service.js';
import { CreateServiceRequestDto } from './dto/customer.dto.js';
import { RoleGuard } from '../common/guard/role.guard.js';
import { Roles } from '../common/guard/roles.decorator.js';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';

@Controller('customer')
@UseGuards(RoleGuard)
@Roles('CUSTOMER')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('request')
  async create(
    @Session() session: UserSession,
    @Body() createCustomerDto: CreateServiceRequestDto,
  ) {
    return await this.customerService.create({
      ...createCustomerDto,
      customerId: session?.user?.id,
    });
  }
}
