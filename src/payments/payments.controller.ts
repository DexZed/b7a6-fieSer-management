import { Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service.js';
import { Body, Get, Post, Query } from '@nestjs/common';
import {
  AllowAnonymous,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';

@Controller('payments')
@AllowAnonymous()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // POST /payments/checkout

  @Post('checkout')
  async createCheckout(
    @Session() session: UserSession,
    @Body() body: { classId: number },
  ) {
    const userId = session.user?.id;

    return this.paymentsService.createCheckoutSession(userId, body.classId);
  }

  // GET /payments/verify?sessionId=cs_test_...

  @Get('verify')
  async verifyPayment(
    @Session() session: UserSession,
    @Query('sessionId') sessionId: string,
  ) {
    const userId = session.user?.id;

    return this.paymentsService.verifyAndFulfillSession(userId, sessionId);
  }
}
