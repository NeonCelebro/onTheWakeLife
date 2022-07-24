import { FindOneOptionsDto } from '../../../common/dto';
import { UserEntity } from '../entities';
import { IsString } from 'class-validator';
import { Brackets, FindOneOptions } from 'typeorm';

export class SearchUsersDto extends FindOneOptionsDto<UserEntity> {
  @IsString()
  public readonly search: string;

  public get where(): FindOneOptions<UserEntity>['where'] {
    const { search } = this;
    return new Brackets((qb) => {
      qb.where(`concat("UserEntity"."firstName", ' ', "UserEntity"."lastName") ILIKE(:search)`, {
        search: `%${search}%`,
      });
      qb.orWhere(`"UserEntity".id::text  ILIKE(:search)`, { search: `%${search}%` });
      qb.orWhere(`"UserEntity"."email"  ILIKE(:search)`, { search: `%${search}%` });
    });
  }
}
