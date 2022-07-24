import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import { FindConditions, FindOneOptions, RemoveOptions, Repository, SaveOptions } from 'typeorm';

import { ErrorTypeEnum } from 'src/common/enums';
import { UserEntity } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  public async createOne(
    entityLike: Partial<UserEntity>,
    options: SaveOptions = { transaction: false },
  ): Promise<UserEntity> {
    return this.userEntityRepository.manager.transaction(async () => {
      const entity = this.userEntityRepository.create(entityLike);
      return this.userEntityRepository.save(entity, options).catch(() => {
        throw new ConflictException(ErrorTypeEnum.USER_ALREADY_EXIST);
      });
    });
  }

  public async selectOne(
    conditions: FindConditions<UserEntity>,
    options: FindOneOptions<UserEntity> = { loadEagerRelations: true },
  ): Promise<UserEntity> {
    return this.userEntityRepository.findOneOrFail(conditions, classToPlain(options)).catch(() => {
      throw new NotFoundException(ErrorTypeEnum.USER_NOT_FOUND);
    });
  }

  /**
   * [description]
   * @param conditions
   * @param entityLike
   * @param options
   */
  public async updateOne(
    conditions: Partial<UserEntity>,
    entityLike: Partial<UserEntity>,
    options: SaveOptions = { transaction: false },
  ): Promise<UserEntity> {
    return this.userEntityRepository.manager.transaction(async () => {
      const mergeIntoEntity = await this.selectOne(conditions);
      const entity = this.userEntityRepository.merge(mergeIntoEntity, entityLike);
      await this.userEntityRepository.save(entity, options).catch(() => {
        throw new ConflictException(ErrorTypeEnum.USER_ALREADY_EXIST);
      });

      return this.selectOne(conditions, { loadEagerRelations: true });
    });
  }

  /**
   * [description]
   * @param conditions
   * @param options
   */
  public async deleteOne(
    conditions: FindConditions<UserEntity>,
    options: RemoveOptions = { transaction: false },
  ): Promise<UserEntity> {
    return this.userEntityRepository.manager.transaction(async () => {
      const entity = await this.selectOne(conditions);
      return this.userEntityRepository.remove(entity, options).catch(() => {
        throw new NotFoundException(ErrorTypeEnum.USER_NOT_FOUND);
      });
    });
  }
}
