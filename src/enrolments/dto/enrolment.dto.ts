// create-enrollment.dto.ts

import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateEnrollmentDto {
  @IsInt()
  @IsNotEmpty()
  classId: number;

  @IsString()
  @IsNotEmpty()
  studentId: string;
}

// join-enrollment.dto.ts

export class JoinEnrollmentDto {
  @IsString()
  @IsNotEmpty()
  inviteCode: string;

  @IsString()
  @IsNotEmpty()
  studentId: string;
}
