import { UseInterceptors } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';

/**
 * [description]
 */
export const MultipartInterceptor =
  (interceptor: any) =>
  (
    // eslint-disable-next-line @typescript-eslint/ban-types
    target: object,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>,
  ): void => {
    ApiConsumes('multipart/form-data')(target, key, descriptor);
    UseInterceptors(interceptor)(target, key, descriptor);
  };
