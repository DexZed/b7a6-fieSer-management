import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import {
  ClassSchema,
  createPaginatedSchema,
  createResponseSchema,
  DepartmentSchema,
  PaginatedUsersSchema,
  SubjectSchema,
  UserSchema,
} from './user.schemas.js';
import { dateTime } from '../../lib/zod.date.parser.js';

export const DepartmentWithCountSchema = DepartmentSchema.extend({
  totalSubjects: z.number(),
});
export const DepartmentDetailsSchema = z.object({
  department: DepartmentSchema,
  totals: z.object({
    subjects: z.number(),
    classes: z.number(),
    enrolledStudents: z.number(),
  }),
});
export class DepartmentsResponse extends createZodDto(
  createPaginatedSchema(DepartmentWithCountSchema),
) {}
export class CreateDepartmentResponse extends createZodDto(
  createResponseSchema(
    z.object({
      id: z.number(),
    }),
  ),
) {}
export class DepartmentDetailsResponse extends createZodDto(
  createResponseSchema(DepartmentDetailsSchema),
) {}
export class DepartmentSubjectsResponse extends createZodDto(
  createPaginatedSchema(SubjectSchema),
) {}

export class DepartmentClassesResponse extends createZodDto(
  z.object({
    data: z.array(
      z.object({
        // Subject relation
        subject: z.object({
          id: z.number(),
          name: z.string(),
          createdAt: dateTime(),
          updatedAt: dateTime(),
          code: z.string(),
          description: z.string().nullable(),
          departmentId: z.number(),
        }),
        // Teacher relation
        teacher: z.object({
          role: z.string(),
          id: z.string(),
          name: z.string(),
          email: z.string(),
          emailVerified: z.boolean(),
          image: z.string().nullable(),
          createdAt: dateTime(),
          updatedAt: dateTime(),
          imageCldPubId: z.string().nullable(),
        }),
        id: z.number(),
        name: z.string(),
        createdAt: dateTime(),
        updatedAt: dateTime(),
        description: z.string().nullable(),
        subjectId: z.number(),
        teacherId: z.string(),
        inviteCode: z.string(),
        price: z.any(),
        currency: z.string(),
        bannerCldPubId: z.string().nullable(),
        bannerUrl: z.string().nullable(),
        capacity: z.number(),
        status: z.string(),
        schedules: z.any(),
      }),
    ),
    pagination: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      totalPages: z.number(),
    }),
  }),
) {}

export class DepartmentUsersResponse extends createZodDto(
  PaginatedUsersSchema,
) {}
