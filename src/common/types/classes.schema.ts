import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import {
  ClassSchema,
  createResponseSchema,
  PaginationSchema,
  SubjectSchema,
  UserSchema,
} from './user.schemas.js';
import { dateTime } from '../../lib/zod.date.parser.js';
export class ClassesResponse extends createZodDto(
  z.object({
    status: z.number(),
    message: z.string(),
    data: z.array(
      z.object({
        id: z.number(),
        subjectId: z.number(),
        teacherId: z.string(),
        inviteCode: z.string(),
        name: z.string(),
        price: z.string(),
        currency: z.string(),
        bannerCldPubId: z.null(),
        bannerUrl: z.null(),
        capacity: z.number(),
        description: z.string(),
        status: z.string(),
        schedules: z.array(
          z.object({
            endTime: z.string(),
            roomUrl: z.string(),
            location: z.string(),
            dayOfWeek: z.string(),
            startTime: z.string(),
          }),
        ),
        createdAt: dateTime(),
        updatedAt: dateTime(),
        subject: z.object({
          id: z.number(),
          departmentId: z.number(),
          name: z.string(),
          code: z.string(),
          description: z.string(),
          createdAt: dateTime(),
          updatedAt: dateTime(),
        }),
        teacher: z.object({
          id: z.string(),
          name: z.string(),
          email: z.string(),
          emailVerified: z.boolean(),
          image: z.null(),
          createdAt: dateTime(),
          updatedAt: dateTime(),
          role: z.string(),
          imageCldPubId: z.null(),
        }),
      }),
    ),
    pagination: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      totalPages: z.number(),
    }),
    timestamp: dateTime(),
  }),
) {}
export class CreateClassResponse extends createZodDto(
  createResponseSchema(
    z.object({
      id: z.number(),
    }),
  ),
) {}
export class ClassResponse extends createZodDto(
  z.object({
    data: z
      .object({
        teacher: UserSchema,
        subject: SubjectSchema,
      })
      .extend(ClassSchema.shape as any),
  }),
) {}
