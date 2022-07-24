import { IsOptional, IsPhoneNumber } from 'class-validator';
import { IsValidPhoneCode } from '../../../common/decorators';
import { ApiProperty } from '@nestjs/swagger';

/**
 * [description]
 */
export class UpdateUserDto {
  @IsOptional()
  public readonly firstName: string;

  @IsOptional()
  public readonly lastName: string;

  @IsOptional()
  @IsValidPhoneCode()
  @ApiProperty({ example: '386', maxLength: 3 })
  public readonly phoneCode: string;

  @IsOptional()
  @ApiProperty({ example: '67766770', maxLength: 20 })
  public readonly phoneNumber: string;

  @IsOptional()
  @IsPhoneNumber()
  public phone: string;
}
