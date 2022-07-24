import { ConflictException, NotFoundException } from '@nestjs/common';
import { classToClass, plainToClass } from 'class-transformer';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FastifyReply } from 'fastify';

import * as utils from 'test/utils';
import * as uuid from 'uuid';

import { ErrorTypeEnum } from 'src/common/enums';
import { StorageService } from 'src/multipart';
import { DatabaseModule } from 'src/database';
import { ConfigModule } from 'src/config';

import { UserEntity } from '../users/entities';

import { PaginationFilesDto } from './dto';
import { FileEntity } from './entities';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';

describe('FilesController', () => {
  let controller: FilesController;
  let storageService: StorageService;

  const owner = plainToClass(UserEntity, { id: '067f2f3e-b936-4029-93d6-b2f58ae4f489' });
  const expected = plainToClass(FileEntity, {
    id: '548e456e-807e-41be-a8ee-bbca79f7c790',
    filename: 'eb8898d6-3927-4b17-9fea-7805eb8f5a1c',
    fileSize: '150',
    mimetype: 'image/jpg',
    encoding: '7bit',
    extname: '.jpg',
    createdAt: new Date('2021-01-15T05:43:30.034Z'),
    updatedAt: new Date('2021-01-15T05:43:30.034Z'),
  });

  beforeAll(async () => {
    process.env.TYPEORM_NAME = uuid.v4();

    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([FileEntity]), DatabaseModule, ConfigModule],
      controllers: [FilesController],
      providers: [
        FilesService,
        {
          provide: StorageService,
          useValue: {
            selectOne: (rep: FastifyReply, { mimetype }: Partial<FileEntity>) =>
              rep.type(mimetype).send,
            createOne: () => expected,
            deleteOne: () => void 0,
          },
        },
      ],
    }).compile();

    controller = module.get<FilesController>(FilesController);
    storageService = module.get<StorageService>(StorageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOne', () => {
    it('should be return file entity', async () => {
      const received = await controller.createOne(owner, { file: expected }).then(classToClass);
      expect(received).toBeInstanceOf(FileEntity);
      expect(received).toEqual({ ...expected, owner });
    });
  });

  describe('selectAll', () => {
    it('should be return file entity', async () => {
      const received = await controller.selectAll(owner);
      expect(received).toBeInstanceOf(PaginationFilesDto);
    });

    it('should be return not found exception', async () => {
      const error = new NotFoundException(ErrorTypeEnum.FILES_NOT_FOUND);
      return controller.selectAll({ skip: -1 } as any).catch((err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err).toStrictEqual(error);
      });
    });
  });

  describe('selectOne', () => {
    const conditions = { id: expected.id };

    it('should be return file entity', async () => {
      const received = await controller.selectOne(conditions);
      expect(received).toBeInstanceOf(FileEntity);
      expect(received).toEqual(expected);
    });

    it('should be return not found exception', async () => {
      const error = new NotFoundException(ErrorTypeEnum.FILE_NOT_FOUND);
      return controller.selectOne({ id: '' }).catch((err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err).toStrictEqual(error);
      });
    });
  });

  describe('downloadOne', () => {
    const conditions = { id: expected.id };

    it('should be return file stream', async () => {
      const { mimetype } = utils.createMockFileMeta(expected);
      const repMock = utils.createRepMock(mimetype);
      return controller.downloadOne(repMock, conditions);
    });

    it('should be return not found exception', async () => {
      const { mimetype } = utils.createMockFileMeta();
      const repMock = utils.createRepMock(mimetype);
      const error = new NotFoundException(ErrorTypeEnum.FILE_NOT_FOUND);
      return controller.downloadOne(repMock, { id: '' }).catch((err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err).toStrictEqual(error);
      });
    });
  });

  describe('deleteOne', () => {
    const conditions = { id: expected.id };

    it('should be return file entity', async () => {
      const received = await controller.deleteOne(owner, conditions);
      expect(received).toBeInstanceOf(FileEntity);
      expect(received.id).toBe(undefined);

      const error = new NotFoundException(ErrorTypeEnum.FILE_NOT_FOUND);
      return controller.deleteOne(owner, conditions).catch((err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err).toStrictEqual(error);
      });
    });

    it('should be return not found exception', async () => {
      const error = new NotFoundException(ErrorTypeEnum.FILE_NOT_FOUND);
      return controller.deleteOne(owner, { id: '' }).catch((err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err).toStrictEqual(error);
      });
    });
  });
});
