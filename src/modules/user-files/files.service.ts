import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import {
  Repository,
  SaveOptions,
  RemoveOptions,
  FindConditions,
  FindOneOptions,
  FindManyOptions,
} from 'typeorm';

import { ErrorTypeEnum } from 'src/common/enums';

import { PaginationFilesDto } from './dto';
import { FileEntity } from './entities';

import { StorageService } from 'src/multipart';

/**
 * [description]
 */
@Injectable()
export class FilesService {
  /**
   * [description]
   * @param fileEntityRepository
   * @param storageService
   */
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileEntityRepository: Repository<FileEntity>,
    private readonly storageService: StorageService,
  ) {}

  /**
   * [description]
   * @param entityLike
   * @param options
   */
  public async createOne(
    entityLike: Partial<FileEntity>,
    options: SaveOptions = { transaction: false },
  ): Promise<FileEntity> {
    return this.fileEntityRepository.manager.transaction(async () => {
      const isAvatarAlreadyExists = await this.selectOne({ owner: entityLike.owner })
        .then(() => true)
        .catch(() => false);

      if (isAvatarAlreadyExists) this.deleteOne({ owner: entityLike.owner });

      const entity = this.fileEntityRepository.create(entityLike);
      return this.fileEntityRepository.save(entity, options).catch(() => {
        this.storageService.deleteOne(entityLike.filename);
        throw new ConflictException(ErrorTypeEnum.FILE_ALREADY_EXIST);
      });
    });
  }

  /**
   * [description]
   * @param options
   */
  public async selectAll(options?: FindManyOptions<FileEntity>): Promise<PaginationFilesDto> {
    return this.fileEntityRepository
      .findAndCount(classToPlain(options))
      .then((data) => new PaginationFilesDto(data))
      .catch(() => {
        throw new NotFoundException(ErrorTypeEnum.FILES_NOT_FOUND);
      });
  }

  /**
   * [description]
   * @param conditions
   * @param options
   */
  public async selectOne(
    conditions: FindConditions<FileEntity>,
    options: FindOneOptions<FileEntity> = { loadEagerRelations: false },
  ): Promise<FileEntity> {
    return this.fileEntityRepository.findOneOrFail(conditions, options).catch(() => {
      throw new NotFoundException(ErrorTypeEnum.FILE_NOT_FOUND);
    });
  }

  /**
   * [description]
   * @param conditions
   * @param options
   */
  public async deleteOne(
    conditions: FindConditions<FileEntity>,
    options: RemoveOptions = { transaction: false },
  ): Promise<FileEntity> {
    return this.fileEntityRepository.manager.transaction(async () => {
      const entity = await this.selectOne(conditions);
      this.storageService.deleteOne(entity.filename);
      return this.fileEntityRepository.remove(entity, options).catch(() => {
        throw new NotFoundException(ErrorTypeEnum.FILE_NOT_FOUND);
      });
    });
  }
}
