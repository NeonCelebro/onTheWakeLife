import { ApiProperty } from '@nestjs/swagger';
import { Matches, MaxLength } from 'class-validator';
import { pwdRegExp } from 'src/common/constants/passwordRegExp';
/**
 * [description]
 */
export class ChangePasswordDto {
  /**
   * [description]
   */
  @MaxLength(64)
  @Matches(pwdRegExp)
  @ApiProperty({ example: 'Psword1!5' })
  public readonly oldPassword: string;

  /**
   * [description]
   */
  @MaxLength(64)
  @Matches(pwdRegExp)
  @ApiProperty({ example: 'Psword1!5' })
  public readonly newPassword: string;
}
