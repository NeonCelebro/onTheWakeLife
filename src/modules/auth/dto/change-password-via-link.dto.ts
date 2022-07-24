import { PickType } from '@nestjs/swagger';

import { CreateUserDto } from '../../users';

/**
 * [description]
 */
export class ChangePasswordViaLinkDto extends PickType(CreateUserDto, ['password']) {}
