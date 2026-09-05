import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { RequestStatus } from '../../common/enums/enums.js';

export class CreateServiceRequestDto {
  @IsOptional()
  @IsString()
  customerId: string;
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  address: string;
  @IsEnum(RequestStatus)
  @IsOptional()
  status?: RequestStatus;
}
