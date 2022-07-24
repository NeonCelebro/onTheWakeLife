import { PickType } from '@nestjs/swagger';

import { CreateUserDto } from '../../users';

/**
 * [description]
 */
export class ResetPasswordRequestDto extends PickType(CreateUserDto, ['username']) {}
