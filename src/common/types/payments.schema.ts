import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export class CheckoutSessionSchema extends createZodDto(
  z.object({
    url: z.string().nullable(),
    stripeId: z.string().nullable(),
  }),
) {}

export class VerifySessionSchema extends createZodDto(
  z.object({
    message: z.string(),
    success: z.boolean(),
  }),
) {}
export class ChechoutSessionBody extends createZodDto(
  z.object({
    classId: z.number(),
  }),
) {}
