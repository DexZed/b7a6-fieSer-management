import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '../../generated/prisma/index.js';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    let httpStatus;
    let message;
    const ctx = host.switchToHttp();

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      message = {
        type: 'HttpException',
        error: exception.message,
      };
    } else if (exception instanceof Error) {
      httpStatus = HttpStatus.BAD_REQUEST;
      message = {
        type: 'Error',
        error: exception.message,
        cause: exception.cause,
      };
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      httpStatus = HttpStatus.BAD_REQUEST;
      message = {
        type: 'PrismaClientKnownRequestError',
        meta: exception.meta,
        code: exception.code,
        message: exception.message,
        cause: exception.cause,
      };
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal Server Error';
    }

    const responseBody = {
      status: httpStatus,
      message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
