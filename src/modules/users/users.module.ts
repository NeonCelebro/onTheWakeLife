import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserEntity } from './entities';
import { MultipartModule } from 'src/multipart';
import { ConfigService } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MultipartModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        limits: {
          fileSize: configService.get('STORE_FILE_SIZE'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
