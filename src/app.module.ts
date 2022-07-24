import { Module } from '@nestjs/common';

import { DatabaseModule } from './database';
import { ConfigModule } from './config';
import { UsersModule } from './modules/users';
import { AuthModule } from './modules/auth';

@Module({
  imports: [DatabaseModule, ConfigModule, UsersModule, AuthModule],
})
export class AppModule {}
