import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import {
  ClassSchema,
  createResponseSchema,
  PaginationSchema,
  SubjectSchema,
  UserSchema,
} from './user.schemas.js';
export class ClassesResponse extends createZodDto(
  z.object({
    data: z.array(
      z
        .object({
          teacher: UserSchema,
          subject: SubjectSchema,
        })
        .extend(ClassSchema.shape as any),
    ),
    pagination: PaginationSchema,
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
