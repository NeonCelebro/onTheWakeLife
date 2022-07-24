import { MigrationInterface, QueryRunner } from 'typeorm';

import { UserEntity } from 'src/modules/users/entities';
import { users } from './users.data';

export class user1615673396368 implements MigrationInterface {
  public async up({ connection }: QueryRunner): Promise<void> {
    const userEntityRepository = connection.getRepository(UserEntity);
    await userEntityRepository.save(users);
  }

  public async down({ connection }: QueryRunner): Promise<void> {
    await connection.getRepository(UserEntity).delete(users.map(({ id }) => id));
  }
}
