import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { dateTime } from '../../lib/zod.date.parser.js';

export const UserSchema = z.object({
  role: z.string(),
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: dateTime(),
  updatedAt: dateTime(),
  imageCldPubId: z.string().nullable(),
});

export const PaginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export const PaginatedUsersSchema = z.object({
  data: z.array(UserSchema),
  pagination: PaginationSchema,
});

export class PaginatedUsersResponse extends createZodDto(
  PaginatedUsersSchema,
) {}

export class UserResponse extends createZodDto(
  z.object({
    data: UserSchema,
  }),
) {}
export class PaginationResponse extends createZodDto(PaginationSchema) {}

export class UsersDepartmentsResponse extends createZodDto(
  z.object({
    data: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        createdAt: dateTime(),
        updatedAt: dateTime(),
        description: z.string().nullable(),
        code: z.string(),
      }),
    ),
    pagination: PaginationSchema,
  }),
) {}

export class UsersSubjectsResponse extends createZodDto(
  z.object({
    data: z.array(
      z.object({
        department: z.object({
          id: z.number(),
          name: z.string(),
          createdAt: dateTime(),
          updatedAt: dateTime(),
          description: z.string().nullable(),
          code: z.string(),
        }),
      }),
    ),
    pagination: PaginationSchema,
  }),
) {}
