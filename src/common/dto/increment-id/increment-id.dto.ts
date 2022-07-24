import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class IncrementID {
  /**
   * Entity ID
   */
  @IsInt()
  @ApiProperty()
  public readonly id: number;
}
