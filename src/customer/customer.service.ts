import { ConflictException, Injectable } from '@nestjs/common';
import { CreateServiceRequestDto } from './dto/customer.dto.js';
import { prisma } from '../lib/prisma.js';
import { RequestStatus } from '../common/enums/enums.js';

@Injectable()
export class CustomerService {
  async create(createCustomerDto: CreateServiceRequestDto) {
    console.log(createCustomerDto, 'created data');
    const result = await prisma.serviceRequest.create({
      data: {
        ...createCustomerDto,
        status: createCustomerDto.status
          ? createCustomerDto.status
          : RequestStatus.PENDING,
      },
    });
    return result;
  }
}
