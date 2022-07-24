import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ID {
  /**
   * Entity ID
   */
  @IsUUID()
  @ApiProperty()
  public readonly id: string;
}
