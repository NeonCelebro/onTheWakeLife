import { Transform } from 'class-transformer';
import { IsDate } from 'class-validator';

export class DATE {
  @IsDate()
  @Transform(({ value }) => new Date(value))
  date: Date;
}
