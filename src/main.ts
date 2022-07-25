import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import rateLimit from 'fastify-rate-limit';
import multipart from 'fastify-multipart';
import compress from 'fastify-compress';
import helmet from 'fastify-helmet';

import { ConfigService } from './config';
import { AppModule } from './app.module';

/**
 * [description]
 */
async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const validationPipe = new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  });

  app.setGlobalPrefix(configService.get('PREFIX'));

  await Promise.all([
    app.register(compress, { encodings: ['gzip', 'deflate'] }),
    app.register(rateLimit, { max: 100 }),
    app.register(multipart),
    app.register(helmet, {
      contentSecurityPolicy: false,
    }),
  ]);

  await app.useGlobalPipes(validationPipe).listen(process.env.PORT || 8080);
  console.log(`!!!!!!!!!!!!! PROCESS PORT: ${process.env.PORT}!!!!!!!!!!!!!!!!!!!`);
  if (configService.get('SWAGGER_MODULE')) {
    const config = new DocumentBuilder()
      .setVersion(configService.get('npm_package_version'))
      .setTitle(configService.get('npm_package_name'))
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/', app, document);
  }
}

bootstrap();
