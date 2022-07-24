import { Inject, Optional, CallHandler, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';

import { MULTIPART_MODULE_OPTIONS } from '../multipart.constants';

import { StorageService } from '../storage.service';

/**
 * [description]
 */
export class FileInterceptor implements NestInterceptor {
  /**
   * [description]
   * @param options [description]
   * @param storageService [description]
   */
  constructor(
    public readonly storageService: StorageService,

    @Optional()
    @Inject(MULTIPART_MODULE_OPTIONS)
    public readonly options?: busboy.BusboyConfig,
  ) {}

  private tryToSerialize(value: string) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
    // tmp decision
  }
  /**
   * [description]
   * @param context [description]
   * @param next    [description]
   */
  public async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    request.body = {};

    for await (const part of request.parts(this.options)) {
      request.body[part.fieldname] = part.file
        ? await this.storageService.createOne(part)
        : this.tryToSerialize(part['value']);
    }

    return next.handle();
  }
}
