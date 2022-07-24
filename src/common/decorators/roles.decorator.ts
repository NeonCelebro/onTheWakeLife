import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DECORATORS } from '@nestjs/swagger/dist/constants';

import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from 'src/modules/users/entities';

/**
 * [description]
 * @param roles
 * @constructor
 */
export const Roles = (...roles: RolesEnum[]) =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  (target: object, key?: string | symbol, descriptor?: TypedPropertyDescriptor<any>): void => {
    const operation: OperationObject = Reflect.getMetadata(
      DECORATORS.API_OPERATION,
      descriptor.value,
    );

    if (!operation) ApiOperation({ summary: `[ROLE: ${roles}]` })(target, key, descriptor);
    else operation.summary = `[ROLE: ${roles}]${operation.summary && ': ' + operation.summary}`;

    SetMetadata('roles', roles)(target, key, descriptor);
    ApiBearerAuth()(target, key, descriptor);
  };
