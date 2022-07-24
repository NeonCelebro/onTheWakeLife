import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule, Module } from '@nestjs/common';

import { ConfigService } from 'src/config';

import { UsersModule } from '../users';
import { JwtStrategy } from './strategies';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    PassportModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        defaultStrategy: configService.get('PASSPORT_STRATEGY'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('PASSPORT_SECRET'),
          signOptions: {
            expiresIn: configService.get('PASSPORT_EXPIRES'),
          },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    CacheModule.register({
      useFactory: (configService: ConfigService) => {
        return {
          store: redisStore,
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
