import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { User } from 'src/common/decorators';

import { UserEntity } from '../users/entities';
import { UsersService } from '../users';
import { JwtAuthGuard } from './guards';
import { CreateProfileDto, CredentialsDto, JwtResponseDto, UpdateProfileDto } from './dto';

import { AuthService } from './auth.service';
import { UpdateProfileResponseDto } from './dto/update-profile-response.dto';
import { plainToClass } from 'class-transformer';

/**
 * [description]
 */
@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  /**
   * [description]
   * @param data
   */
  @Post('signin')
  public async createToken(@Body() data: CredentialsDto): Promise<JwtResponseDto> {
    return this.authService.createToken(data);
  }

  /**
   * [description]
   * @param data
   */
  @Post('signup')
  public async createUser(@Body() data: CreateProfileDto): Promise<void> {
    await this.authService.createUser(data);
  }

  /**
   * [description]
   * @param user
   */
  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async selectUser(@User() user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @Patch('profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async updateUser(
    @User() user: UserEntity,
    @Body() data: UpdateProfileDto,
  ): Promise<UpdateProfileResponseDto> {
    const updatedResult = await this.usersService.updateOne({ id: user.id }, data);
    const updatedToken = this.authService.generateToken(updatedResult);
    return {
      profile: plainToClass(CreateProfileDto, updatedResult),
      tokenInfo: updatedToken,
    };
  }
}
