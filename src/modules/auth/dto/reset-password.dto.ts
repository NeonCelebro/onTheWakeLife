import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../users';

/**
 * [description]
 */
export class ResetPasswordDto extends PickType(CreateUserDto, ['password', 'username']) {}
