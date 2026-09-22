import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { createResponseSchema } from './user.schemas.js';
import { dateTime } from '../../lib/zod.date.parser.js';

const departmentSchema = z.object({
  code: z.string(),
  id: z.number(),
  description: z.string().nullable(),
  name: z.string(),
  createdAt: dateTime(),
  updatedAt: dateTime(),
});

const itemSchema = departmentSchema.extend({
  departmentId: z.number(),
  department: departmentSchema,
});

const paginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export const responseSchema = z.object({
  data: z.array(itemSchema),
  pagination: paginationSchema,
});

export class SubjectsResponse extends createZodDto(responseSchema) {}
export class SubjectBody extends createZodDto(
  z.object({
    departmentId: z.number(),
    name: z.string(),
    code: z.string(),
    description: z.string().optional(),
  }),
) {}

export class SubjectResponse extends createZodDto(
  createResponseSchema(
    z.object({
      id: z.number(),
    }),
  ),
) {}

const subjectSchema = departmentSchema.extend({
  departmentId: z.number(),
  department: departmentSchema,
});

const totalsSchema = z.object({
  classes: z.number(),
});
export class SubjetsDetailsResponse extends createZodDto(
  z.object({
    data: z.object({
      subject: subjectSchema,
      totals: totalsSchema,
    }),
  }),
) {}
