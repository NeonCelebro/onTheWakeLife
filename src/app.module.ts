import { Module } from '@nestjs/common';

import { DatabaseModule } from './database';
import { ConfigModule } from './config';

import { UserFilesModule } from './modules/user-files';
import { UsersModule } from './modules/users';
import { AuthModule } from './modules/auth';
import { MailerModule } from './modules/mailer';

@Module({
  imports: [MailerModule, DatabaseModule, ConfigModule, UserFilesModule, UsersModule, AuthModule],
})
export class AppModule {}
