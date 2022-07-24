import { ApiProperty } from '@nestjs/swagger';

import { JwtResponseDto } from './jwt-response.dto';
import { UserEntity } from '../../users/entities';

/**
 * [description]
 */
export class UpdateProfileResponseDto {
  /**
   * [description]
   */
  @ApiProperty({ example: UserEntity })
  public readonly profile: Partial<UserEntity>;

  /**
   * [description]
   */
  @ApiProperty({ example: JwtResponseDto })
  public readonly tokenInfo: JwtResponseDto;
}
