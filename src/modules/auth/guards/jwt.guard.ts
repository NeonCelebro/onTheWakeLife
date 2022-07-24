import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { ErrorTypeEnum } from 'src/common/enums';

import { UserEntity } from '../../users/entities';

/**
 * [description]
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * [description]
   * @param reflector
   */
  constructor(private readonly reflector: Reflector) {
    super();
  }

  /**
   * [description]
   * @param err
   * @param user
   * @param info
   * @param ctx
   */
  public handleRequest(
    err: Error,
    user: UserEntity,
    info: Error,
    ctx: ExecutionContext,
  ): UserEntity | any {
    if (info) throw new UnauthorizedException(ErrorTypeEnum.AUTH_INVALID_TOKEN);
    if (!user) throw new UnauthorizedException(ErrorTypeEnum.AUTH_UNAUTHORIZED);

    const roles = this.reflector.get<string[]>('roles', ctx.getHandler());
    if (!roles || (roles && roles.includes(user.role))) return user;

    throw new ForbiddenException(ErrorTypeEnum.AUTH_FORBIDDEN);
  }
}
