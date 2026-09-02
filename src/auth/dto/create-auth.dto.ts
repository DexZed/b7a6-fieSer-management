import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export enum Role {
  CUSTOMER = 'CUSTOMER',
  TECHNICIAN = 'TECHNICIAN',
  DISPATCHER = 'DISPATCHER',
  FINANCE = 'FINANCE',
  ADMIN = 'ADMIN',
}

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsEnum(Role, {
    message: `Roles must be one of ${Object.values(Role).join(', ')}`,
  })
  role?: string;
}

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
