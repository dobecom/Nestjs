import { ErrorCodes } from '@app/common/code/error.code';
import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthAdminGuard extends AuthGuard('jwt-sign-admin') {
  constructor(private logger: Logger) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    this.logger.log(
      `1. canActivate\n>> ${request.headers.authorization}`,
      'SignGuard'
    );
    return super.canActivate(context);
  }

  handleRequest<T>(err: unknown, users: any /*, info: unknown*/): T {
    if (err || !users) {
      throw (
        err ||
        new UnauthorizedException({
          code: ErrorCodes.UA007,
        })
      );
    }
    this.logger.log(`3. handleRequest\n>> uid : ${users.uid}`, 'SignGuard');
    return users as T;
  }
}
