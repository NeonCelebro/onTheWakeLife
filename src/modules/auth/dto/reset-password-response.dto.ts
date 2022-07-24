import { ApiProperty } from '@nestjs/swagger';

/**
 * [description]
 */
export class ResetPasswordResponseDto {
  @ApiProperty({ example: 'The code has already been sent to the mail' })
  public readonly message: string;
}
