import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { MultipartModule } from 'src/multipart';
import { ConfigService } from 'src/config';

import { FileEntity } from './entities';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    MultipartModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        limits: {
          fileSize: configService.get('STORE_FILE_SIZE'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class UserFilesModule {}
