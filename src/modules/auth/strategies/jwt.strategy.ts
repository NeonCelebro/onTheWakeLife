import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ConfigService } from 'src/config';

import { RolesEnum } from 'src/common/enums';
import { StatusEnum, UserEntity } from '../../users/entities';

import { AdminEntity } from '../../admin/entities';
import { PartnerEntity, StatusEnum as StatusEnumPartner } from '../../partners/entities';

import { AuthService } from '../auth.service';
import { PartnersService } from '../../partners';
import { JwtValidateResponseDto } from '../dto/jwt-validate-response.dto';

/**
 * [description]
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * [description]
   * @param configService
   * @param authService
   * @param partnersService
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly partnersService: PartnersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('PASSPORT_SECRET'),
      ignoreExpiration: true,
    });
  }

  public async validate({
    id,
    ppid,
    role,
  }: JwtValidateResponseDto): Promise<UserEntity | AdminEntity | PartnerEntity> {
    switch (role) {
      case RolesEnum.USER:
        return this.authService.validateUser({ id, ppid, status: StatusEnum.ACTIVATED });
      case RolesEnum.PARTNER:
        return this.partnersService.validateUser({ id, ppid, status: StatusEnumPartner.APPROVED });
      case RolesEnum.ADMIN:
      case RolesEnum.SUPER_ADMIN:
        return this.authService.validateAdmin({ id, ppid });
    }
  }
}
