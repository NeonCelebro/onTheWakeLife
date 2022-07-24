import { FastifyMultipartOptions } from 'fastify-multipart';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Type } from '@nestjs/common';

/**
 * [description]
 */
export type MultipartModuleOptions = FastifyMultipartOptions;

/**
 * [description]
 */
export interface MultipartOptionsFactory {
  createMultipartOptions(): Promise<MultipartModuleOptions> | MultipartModuleOptions;
}

/**
 * [description]
 */
export interface MultipartModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<MultipartOptionsFactory>;
  useClass?: Type<MultipartOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<MultipartModuleOptions> | MultipartModuleOptions;
  inject?: any[];
}
