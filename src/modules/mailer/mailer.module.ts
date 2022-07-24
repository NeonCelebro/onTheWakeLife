import { MailerService } from './mailer.service';
import { Module } from '@nestjs/common';
import { ConfigService } from 'src/config';

@Module({
  imports: [ConfigService],
  controllers: [],
  providers: [MailerService, ConfigService],
  exports: [MailerService],
})
export class MailerModule {}
