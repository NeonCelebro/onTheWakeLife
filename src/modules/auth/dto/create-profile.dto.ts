import { PickType } from '@nestjs/swagger';

import { RolesEnum } from '../../users/entities';
import { CreateUserDto } from '../../users';

/**
 * [description]
 */
export enum CreateProfileRole {
  'USER' = RolesEnum.USER,
}

/**
 * [description]
 */
export class CreateProfileDto extends PickType(CreateUserDto, [
  'firstName',
  'lastName',
  'password',
  'username',
  'instagram',
  'telegram',
  'phoneNumber',
]) {}
