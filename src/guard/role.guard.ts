import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    console.log('Guard Context:', context);
    console.log('Guard Request:', request);
    // const user = request.user;

    // if (!user || user === undefined || user === null) {
    //   throw new UnauthorizedException('Unauthorized: No user found');
    // }

    // console.log('User: ', user);
    return true;
  }
}
