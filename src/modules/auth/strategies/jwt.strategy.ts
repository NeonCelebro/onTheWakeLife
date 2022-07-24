import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ConfigService } from 'src/config';

import { StatusEnum, UserEntity } from '../../users/entities';

import { AuthService } from '../auth.service';
import { JwtValidateResponseDto } from '../dto/jwt-validate-response.dto';
import { UsersService } from '../../users';

/**
 * [description]
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('PASSPORT_SECRET'),
      ignoreExpiration: true,
    });
  }

  public async validate({ id, ppid, role }: JwtValidateResponseDto): Promise<UserEntity> {
    const user = await this.usersService.selectOne({ id, ppid, status: StatusEnum.ACTIVATED });
    if (role === user.role) {
      return user;
    }
  }
}
