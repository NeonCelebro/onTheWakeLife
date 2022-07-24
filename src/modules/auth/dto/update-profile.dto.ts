import { PickType } from '@nestjs/swagger';

import { CreateUserDto } from '../../users';

/**
 * [description]
 */
export class UpdateProfileDto extends PickType(CreateUserDto, [
  'firstName',
  'lastName',
  'password',
  'instagram',
  'telegram',
  'phoneNumber',
]) {}
