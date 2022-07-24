import { IsPhoneNumber, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { pwdRegExp } from 'src/common/constants/passwordRegExp';

/**
 * [description]
 */
export class CreateUserDto {
  @MinLength(1)
  @MaxLength(50)
  @ApiProperty({ example: 'John', required: true })
  public readonly firstName: string;

  @MinLength(1)
  @MaxLength(50)
  @ApiProperty({ example: 'Doe', required: true })
  public readonly lastName: string;

  @MinLength(1)
  @MaxLength(50)
  @ApiProperty({ example: 'ridersGod2K22', required: true })
  public readonly username: string;

  @MaxLength(50)
  @ApiProperty({ example: '@ridersGod2K22' })
  public readonly instagram?: string;

  @MaxLength(50)
  @ApiProperty({ example: '@ridersGod2K22' })
  public readonly telegram?: string;

  @IsPhoneNumber()
  @ApiProperty({ example: '+996777320693', maxLength: 20, required: true })
  public readonly phoneNumber: string;

  @MaxLength(64)
  @Matches(pwdRegExp)
  @ApiProperty({ minLength: 8, maxLength: 64, example: 'Psword1!5', required: true })
  public readonly password: string;
}
