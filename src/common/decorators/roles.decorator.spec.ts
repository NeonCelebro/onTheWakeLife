import { Test, TestingModule } from '@nestjs/testing';
import { Controller } from '@nestjs/common';

import { RolesEnum } from 'src/modules/users/entities';

import { Roles } from './roles.decorator';
import { ApiOperation } from '@nestjs/swagger';

describe('UserDecorator', () => {
  const decorator = Roles(RolesEnum.USER);

  it('should be defined', () => {
    expect(decorator).toBeDefined();
  });

  it('should be return custom summary into swagger/apiOperation metadata', async () => {
    @Controller()
    class TestController {
      @Roles(RolesEnum.USER)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      public foo(): void {}
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
    }).compile();

    const [operation, roles, security] = ['swagger/apiOperation', 'roles', 'swagger/apiSecurity'];
    const received = module.get<TestController>(TestController).foo;

    expect(Reflect.getMetadataKeys(received)).toEqual([operation, roles, security]);
    expect(Reflect.getMetadata(roles, received)).toEqual([RolesEnum.USER]);
    expect(Reflect.getMetadata(operation, received)).toEqual({
      summary: '[ROLE: USER]',
    });
  });

  it('should be return modify summary into swagger/apiOperation metadata', async () => {
    @Controller()
    class TestController {
      @Roles(RolesEnum.USER)
      @ApiOperation({ summary: 'Test' })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      public foo(): void {}
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
    }).compile();

    const [operation, roles, security] = ['swagger/apiOperation', 'roles', 'swagger/apiSecurity'];
    const received = module.get<TestController>(TestController).foo;

    expect(Reflect.getMetadataKeys(received)).toEqual([operation, roles, security]);
    expect(Reflect.getMetadata(roles, received)).toEqual([RolesEnum.USER]);
    expect(Reflect.getMetadata(operation, received)).toEqual({
      summary: '[ROLE: USER]: Test',
    });
  });

  it('should be return merge options into swagger/apiOperation metadata', async () => {
    @Controller()
    class TestController {
      @Roles(RolesEnum.USER)
      @ApiOperation({ deprecated: true })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      public foo(): void {}
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
    }).compile();

    const [operation, roles, security] = ['swagger/apiOperation', 'roles', 'swagger/apiSecurity'];
    const received = module.get<TestController>(TestController).foo;

    expect(Reflect.getMetadataKeys(received)).toEqual([operation, roles, security]);
    expect(Reflect.getMetadata(roles, received)).toEqual([RolesEnum.USER]);
    expect(Reflect.getMetadata(operation, received)).toEqual({
      summary: '[ROLE: USER]',
      deprecated: true,
    });
  });
});
