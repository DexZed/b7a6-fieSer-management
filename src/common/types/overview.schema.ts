import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import {
  ClassSchema,
  createResponseSchema,
  UserSchema,
} from './user.schemas.js';

export class OverviewSchema extends createZodDto(
  createResponseSchema(
    z.object({
      users: z.number(),
      teachers: z.number(),
      admins: z.number(),
      subjects: z.number(),
      departments: z.number(),
      classes: z.number(),
    }),
  ),
) {}
export class ChartSchema extends createZodDto(
  createResponseSchema(
    z.object({
      usersByRole: z.array(
        z.object({
          role: z.string(),
          total: z.number(),
        }),
      ),
      subjectsByDepartment: z.array(
        z.object({
          departmentId: z.number(),
          departmentName: z.string(),
          totalSubjects: z.number(),
        }),
      ),
      classesBySubject: z.array(
        z.object({
          subjectId: z.number(),
          subjectName: z.string(),
          totalClasses: z.number(),
        }),
      ),
    }),
  ),
) {}
