import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * [description]
 */
export class DownloadFileDto {
  /**
   * [description]
   */
  @IsInt()
  @IsOptional()
  @IsPositive()
  @ApiProperty({ type: String, example: 150 })
  public readonly width?: number;

  /**
   * [description]
   */
  @IsInt()
  @IsOptional()
  @IsPositive()
  @ApiProperty({ type: String, example: 150 })
  public readonly height?: number;
}
