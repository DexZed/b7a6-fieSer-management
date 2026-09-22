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

export const ClassStatusSchema = z.enum(['active', 'inactive', 'archived']);
export const PaymentStatusSchema = z.enum([
  'pending',
  'succeeded',
  'failed',
  'refunded',
]);

const TimestampsSchema = z.object({
  createdAt: dateTime(),
  updatedAt: dateTime(),
});

const BaseResourceSchema = z
  .object({
    id: z.number(),
    code: z.string(),
    name: z.string(),
    description: z.string().nullable(),
  })
  .merge(TimestampsSchema);

export const createPaginatedSchema = <T extends z.ZodType>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    pagination: PaginationSchema,
  });

export const createResponseSchema = <T extends z.ZodType>(itemSchema: T) =>
  z.object({
    data: itemSchema,
  });

export const DepartmentSchema = BaseResourceSchema;

export const SubjectSchema = BaseResourceSchema.extend({
  departmentId: z.number(),
  department: DepartmentSchema.optional(),
});

export const ClassSchema = TimestampsSchema.extend({
  id: z.number(),
  subjectId: z.number(),
  teacherId: z.string(),
  inviteCode: z.string(),
  name: z.string(),
  price: z.number(),
  currency: z.string(),
  bannerCldPubId: z.string().nullable(),
  bannerUrl: z.string().nullable(),
  capacity: z.number(),
  description: z.string().nullable(),
  status: ClassStatusSchema,
  schedules: z.any(),
  subject: SubjectSchema.optional(),
});

export const PaymentSchema = TimestampsSchema.extend({
  id: z.number(),
  userId: z.string(),
  classId: z.number(),
  amount: z.number(),
  currency: z.string(),
  status: PaymentStatusSchema,
  stripePaymentIntentId: z.string().nullable(),
  stripeCheckoutSessionId: z.string().nullable(),
});

export const EnrollmentSchema = TimestampsSchema.extend({
  id: z.number(),
  studentId: z.string(),
  classId: z.number(),
  paymentId: z.number().nullable(),
});

export class PaginationResponse extends createZodDto(PaginationSchema) {}
