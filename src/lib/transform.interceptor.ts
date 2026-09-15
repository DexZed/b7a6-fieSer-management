import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import type { Response } from 'express';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('--- Interceptor triggered ---');
    const response = context.switchToHttp().getResponse<Response>();
    const status = response.statusCode ?? 200;
    return next.handle().pipe(
      map((data: T) => {
        console.log('--- Inside map operator ---');
        return {
          status: status,
          message: 'Success',
          response: data,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
