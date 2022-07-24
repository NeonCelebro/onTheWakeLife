import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import {
  Res,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  UseGuards,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { ID, FindManyOptionsDto, FindOneOptionsDto } from 'src/common/dto';
import { FileInterceptor, MultipartInterceptor, StorageService } from 'src/multipart';
import { User } from 'src/common/decorators';

import { JwtAuthGuard } from '../auth/guards';
import { UserEntity } from '../users/entities';

import { PaginationFilesDto, CreateFileDto, DownloadFileDto } from './dto';
import { FileEntity } from './entities';

import { FilesService } from './files.service';

/**
 * [description]
 */
@ApiTags('user-files')
@Controller('user-files')
@UseInterceptors(ClassSerializerInterceptor)
export class FilesController {
  /**
   * [description]
   * @param storageService
   * @param filesService
   */
  constructor(
    private readonly storageService: StorageService,
    private readonly filesService: FilesService,
  ) {}

  /**
   * [description]
   * @param owner
   * @param file
   */
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @MultipartInterceptor(FileInterceptor)
  public async createOne(
    @User() owner: UserEntity,
    @Body() { file }: CreateFileDto,
  ): Promise<FileEntity> {
    return this.filesService.createOne({ ...file, owner });
  }

  /**
   * [description]
   * @param owner
   * @param options
   */
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async selectAll(
    @User() owner: UserEntity,
    @Query() options?: FindManyOptionsDto<FileEntity>,
  ): Promise<PaginationFilesDto> {
    return this.filesService.selectAll({ ...options, where: { owner } });
  }

  /**
   * [description]
   * @param conditions
   * @param options
   */
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async selectOne(
    @Param() conditions: ID,
    @Query() options?: FindOneOptionsDto<FileEntity>,
  ): Promise<FileEntity> {
    return this.filesService.selectOne(conditions, options);
  }

  /**
   * [description]
   * @param owner
   * @param conditions
   */
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async deleteOne(@User() owner: UserEntity, @Param() conditions: ID): Promise<FileEntity> {
    return this.filesService.deleteOne({ ...conditions, owner });
  }

  /**
   * [description]
   * @param rep
   * @param conditions
   * @param options
   */
  @Get('download/:id')
  public async downloadOne(
    @Res() rep: FastifyReply,
    @Param() conditions: ID,
    @Query() options?: DownloadFileDto,
  ): Promise<FastifyReply> {
    const file = await this.filesService.selectOne(conditions);
    return this.storageService.selectOne(rep, file, options);
  }
}
