import { CACHE_MANAGER, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ErrorTypeEnum } from 'src/common/enums';
import { ConfigService } from 'src/config';
import { Chance } from 'chance';
import { Cache } from 'cache-manager';

import { UserEntity } from '../users/entities';
import { UsersService } from '../users';

import { CreateProfileDto, CredentialsDto, JwtResponseDto } from './dto';

/**
 * [description]
 */
@Injectable()
export class AuthService {
  /**
   * [description]
   * @param configService
   * @param usersService
   * @param jwtService
   * @param mailerService
   */
  private readonly chance;

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.chance = new Chance();
  }

  /**
   * [description]
   * @param id
   * @param ppid
   * @param role
   */

  public generateToken({ id, ppid, role }: UserEntity): JwtResponseDto {
    const expiresIn = this.configService.get<number>('PASSPORT_EXPIRES');
    const token = this.jwtService.sign({ id, ppid, role });
    return { expiresIn, token, role };
  }

  /**
   * [description]
   * @param email
   * @param password
   */
  public async createToken({ username, password }: CredentialsDto): Promise<JwtResponseDto> {
    try {
      const user = await this.usersService.selectOne({ username });
      await user.comparePassword(password);
      return this.generateToken(user);
    } catch {
      throw new UnauthorizedException(ErrorTypeEnum.AUTH_INCORRECT_CREDENTIALS);
    }
  }

  /**
   * [description]
   * @param data
   */
  public async createUser(data: CreateProfileDto): Promise<void> {
    await this.usersService.createOne(data);
  }
}
