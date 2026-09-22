import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import {
  EnrollmentSchema,
  ClassSchema,
  SubjectSchema,
  DepartmentSchema,
  UserSchema,
  createResponseSchema,
} from './user.schemas.js';

export const CreateEnrollmentSchema = z.object({
  classId: z.number(),
  studentId: z.string(),
});

export const JoinEnrollmentSchema = z.object({
  inviteCode: z.string(),
  studentId: z.string(),
});

export const EnrollmentDetailsSchema = EnrollmentSchema.extend({
  class: ClassSchema.extend({
    subject: SubjectSchema.extend({
      department: DepartmentSchema,
    }),
    teacher: UserSchema.optional(),
  }),
  student: UserSchema,
});

export class CreateEnrollmentDto extends createZodDto(CreateEnrollmentSchema) {}
export class JoinEnrollmentDto extends createZodDto(JoinEnrollmentSchema) {}

export class EnrollmentDetailsResponse extends createZodDto(
  createResponseSchema(EnrollmentDetailsSchema),
) {}
