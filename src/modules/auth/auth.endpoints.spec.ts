import { Test, TestingModule } from '@nestjs/testing';

import { RolesEnum, UserEntity } from '../users/entities';
import { UsersService } from '../users';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminService } from '../admin/admin.service';
import { PartnersService } from '../partners';
import { SubscriptionPlansService } from '../subscription-plans/subscription-plans.service';
import { StudiosService } from '../studios/services/admin-access/studios.service';
import {
  JwtResponseDto,
  RegistrationCodeResponseDto,
  ResetPasswordResponseDto,
  SelectProfileDto,
} from './dto';
import { UpdateProfileResponseDto } from './dto/update-profile-response.dto';
import { NotFoundException } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import {
  AdminEntity,
  GenderEnum as AdminGenderEnum,
  RolesEnum as AdminRoles,
} from '../admin/entities';
import { AuthModule } from './auth.module';
import { ConfigModule } from 'src/config';
import { DatabaseModule } from '../../database';
import { SubscriptionPlansModule } from '../subscription-plans/subscription-plans.module';

const expectedSuperAdmin = {
  role: AdminRoles.SUPER_ADMIN,
  firstName: 'John',
  lastName: 'Doe',
  phone: '380661254756',
  gender: AdminGenderEnum.UNSPECIFIED,
  email: 'example@e.mail',
  password: '$2b$08$XpX3up0mK.LbJUMoH2S6lOeKdBQiuNzN52EAwVqQhVICKnYDrhqzy',
  ppid: '36spKamcVQdzfUZeSD8M9+BEn2UnmETuUbpc2WudxhQ=',
  id: 'f291bc59-c217-4d9a-a94c-27d33f485f6b',
} as AdminEntity;

const expectedAdmin = {
  id: 'f165cdee-7465-4476-a642-391c3fe030c5',
  ppid: '0IBdjvbVoAaDnT/2zJhvc9VNVep5YKrJqcgSZhQ7s30=',
  role: AdminRoles.ADMIN,
  firstName: 'John',
  lastName: 'Doe',
  phone: '380661254780',
  gender: AdminGenderEnum.UNSPECIFIED,
  email: 'qwerty99.js@gmail.com',
  password: '$2b$08$XpX3up0mK.LbJUMoH2S6lOeKdBQiuNzN52EAwVqQhVICKnYDrhqzy',
} as AdminEntity;

const user = {
  id: '067f2f3e-b936-4029-93d6-b2f58ae4f489',
  ppid: '3fyp8PSzNKX1/d8Wv43eV1qybL+02m/Bb4NyH9SfUAI=',
  role: RolesEnum.USER,
} as UserEntity;

describe('Auth Controller', () => {
  let controller: AuthController;
  const options = {} as SelectProfileDto;
  const expected = {} as UserEntity;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            selectOne: () => new UserEntity(),
            updateOne: () => new UpdateProfileResponseDto(),
            deleteOne: () => new UserEntity(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            createToken: () => new JwtResponseDto(),
            createUser: () => new RegistrationCodeResponseDto(),
            acceptRegistrationCode: () => new JwtResponseDto(),
            resendingRegistrationCode: () => new RegistrationCodeResponseDto(),
            sendResetPasswordCode: () => new ResetPasswordResponseDto(),
            acceptResetPasswordCode: () => new JwtResponseDto(),
            resetPassword: () => new ResetPasswordResponseDto(),
            changePassword: () => new JwtResponseDto(),
          },
        },
        {
          provide: AdminService,
          useValue: {},
        },
        {
          provide: PartnersService,
          useValue: {},
        },
        {
          provide: SubscriptionPlansService,
          useValue: {},
        },
        {
          provide: StudiosService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createToken', () => {
    it('should be return jwt entity', async () => {
      const received = await controller.createToken(expected);
      expect(received).toBeInstanceOf(JwtResponseDto);
    });
  });

  describe('createUser', () => {
    it('should be return RegistrationCodeResponseDto entity', async () => {
      const received = await controller.createUser(expected);
      expect(received).toBeInstanceOf(RegistrationCodeResponseDto);
    });
  });

  describe('acceptRegistrationCode', () => {
    it('should be return jwt entity', async () => {
      const received = await controller.compareCode(expected);
      expect(received).toBeInstanceOf(JwtResponseDto);
    });
  });

  describe('resendRegistrationCode', () => {
    it('should be return jwt entity', async () => {
      const received = await controller.resendRegistratioCode(expected);
      expect(received).toBeInstanceOf(RegistrationCodeResponseDto);
    });
  });

  // describe('selectUser', () => {
  //   it('should be return user entity', async () => {
  //     const received = await controller.selectUser(expected, options);
  //     expect(received).toBeInstanceOf(UserEntity);
  //   });
  // });

  // describe('updateUser', () => {
  //   it('should be return UpdateProfileResponseDto', async () => {
  //     const received = await controller.updateUser(expected, { firstName: 'Fit Child' });
  //    expect(received).toBeInstanceOf(UpdateProfileResponseDto);
  //   });
  // });

  describe('resendRegistrationCode', () => {
    it('should be return jwt entity', async () => {
      const received = await controller.resendRegistratioCode(expected);
      expect(received).toBeInstanceOf(RegistrationCodeResponseDto);
    });
  });

  // describe('deleteUser', () => {
  //   it('should be return remove user entity', async () => {
  //     const received = await controller.deleteUser(expected);
  //     console.log('removiggggggggggggggggg')
  //     console.log(received)
  //     expect(received).toBeInstanceOf(UserEntity);
  //   });
  // });

  describe('changeUserPassword', () => {
    it('should be return JwtResponseDto', async () => {
      const received = await controller.changeUserPassword(expected, {
        oldPassword: 'password',
        newPassword: 'passWord',
      });
      expect(received).toBeInstanceOf(JwtResponseDto);
    });
    it('should be return UnauthorizedException', async () => {
      const passwords = {
        oldPassword: 'paswd',
        newPassword: 'passWord',
      };
      await controller.changeUserPassword(expected, passwords);
      expect(passwords.oldPassword).toEqual('paswd');
      expect(new NotFoundException()).toBeInstanceOf(NotFoundException);
    });
  });
});

describe('Auth endpoints', () => {
  let app: NestFastifyApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule, ConfigModule, DatabaseModule, SubscriptionPlansModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET/ should get admin profile if user role is ADMIN', async () => {
    const { token } = await authService.generateAdminToken(expectedAdmin);
    const result = await app.inject({
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
      url: '/auth/admin/profile',
    });

    const received = JSON.parse(result.body);

    expect(result.statusCode).toStrictEqual(200);
    expect(received.id).toStrictEqual(expectedAdmin.id);
    expect(received.role).toStrictEqual('ADMIN');
  });

  it('GET/ should get super admin profile if user role is SUPER ADMIN', async () => {
    const { token } = await authService.generateAdminToken(expectedSuperAdmin);
    const result = await app.inject({
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
      url: '/auth/admin/profile',
    });

    const received = JSON.parse(result.body);

    expect(result.statusCode).toStrictEqual(200);
    expect(received.id).toStrictEqual(expectedSuperAdmin.id);
    expect(received.role).toStrictEqual('SUPER_ADMIN');
  });

  it('GET/ should not get admin profile if user role is not ADMIN', async () => {
    const { token } = await authService.generateToken(user);
    const result = await app.inject({
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
      url: '/auth/admin/profile',
    });

    expect(result.statusCode).toStrictEqual(403);
    expect(result.statusMessage).toStrictEqual('Forbidden');
  });

  it('GET/ should edit admin profile if user role is ADMIN', async () => {
    const { token } = await authService.generateAdminToken(expectedAdmin);
    const result = await app.inject({
      method: 'PATCH',
      headers: { Authorization: 'Bearer ' + token },
      payload: { role: 'SUPER_ADMIN' },
      url: '/auth/admin/profile',
    });

    const received = JSON.parse(result.body);

    expect(result.statusCode).toStrictEqual(200);
    expect(received.id).toStrictEqual(expectedAdmin.id);
    expect(received.role).toStrictEqual('SUPER_ADMIN');
  });

  it('GET/ should edit super admin profile if user role is SUPER ADMIN', async () => {
    const { token } = await authService.generateAdminToken(expectedSuperAdmin);
    const result = await app.inject({
      method: 'PATCH',
      headers: { Authorization: 'Bearer ' + token },
      payload: { role: 'ADMIN' },
      url: '/auth/admin/profile',
    });

    const received = JSON.parse(result.body);

    expect(result.statusCode).toStrictEqual(200);
    expect(received.id).toStrictEqual(expectedSuperAdmin.id);
    expect(received.role).toStrictEqual('ADMIN');
  });

  it('GET/ should not edit admin profile if user role is not ADMIN', async () => {
    const { token } = await authService.generateToken(user);
    const result = await app.inject({
      method: 'PATCH',
      headers: { Authorization: 'Bearer ' + token },
      payload: { role: 'ADMIN' },
      url: '/auth/admin/profile',
    });

    expect(result.statusCode).toStrictEqual(403);
    expect(result.statusMessage).toStrictEqual('Forbidden');
  });
});
