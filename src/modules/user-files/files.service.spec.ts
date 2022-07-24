import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

import * as uuid from 'uuid';

import { ErrorTypeEnum } from 'src/common/enums';
import { StorageService } from 'src/multipart';
import { DatabaseModule } from 'src/database';
import { ConfigModule } from 'src/config';

import { UserEntity } from '../users/entities';

import { PaginationFilesDto } from './dto';
import { FileEntity } from './entities';

import { FilesService } from './files.service';

describe('FilesService', () => {
  let service: FilesService;

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
      providers: [
        FilesService,
        {
          provide: StorageService,
          useValue: {
            deleteOne: async () => void 0,
          },
        },
      ],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOne', () => {
    it('should be return file entity', async () => {
      const received = await service.createOne({ ...expected, owner });
      expect(received).toBeInstanceOf(FileEntity);
      expect(received).toEqual({ ...expected, owner });
    });

    it('should be return conflict exception', async () => {
      const error = new ConflictException(ErrorTypeEnum.FILE_ALREADY_EXIST);
      return service.createOne({ ...expected, fileSize: '0' }).catch((err) => {
        expect(err).toBeInstanceOf(ConflictException);
        expect(err).toStrictEqual(error);
      });
    });
  });

  describe('selectAll', () => {
    it('should be return file entity', async () => {
      const received = await service.selectAll();
      expect(received).toBeInstanceOf(PaginationFilesDto);
    });

    it('should be return not found exception', async () => {
      const error = new NotFoundException(ErrorTypeEnum.FILES_NOT_FOUND);
      return service.selectAll({ skip: -1 }).catch((err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err).toStrictEqual(error);
      });
    });
  });

  describe('selectOne', () => {
    const conditions = { id: expected.id };

    it('should be return file entity', async () => {
      const received = await service.selectOne(conditions);
      expect(received).toBeInstanceOf(FileEntity);
      expect(received).toEqual(expected);
    });

    it('should be return not found exception', async () => {
      const error = new NotFoundException(ErrorTypeEnum.FILE_NOT_FOUND);
      return service.selectOne({ id: '' }).catch((err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err).toStrictEqual(error);
      });
    });
  });

  describe('deleteOne', () => {
    const conditions = { id: expected.id };

    it('should be return file entity', async () => {
      const received = await service.deleteOne(conditions);
      expect(received).toBeInstanceOf(FileEntity);
      expect(received.id).toBe(undefined);

      const error = new NotFoundException(ErrorTypeEnum.FILE_NOT_FOUND);
      return service.selectOne(conditions).catch((err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err).toStrictEqual(error);
      });
    });

    it('should be return not found exception', async () => {
      const error = new NotFoundException(ErrorTypeEnum.FILE_NOT_FOUND);
      return service.deleteOne({}).catch((err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err).toStrictEqual(error);
      });
    });

    it('should be return transaction exception', async () => {
      const error = new NotFoundException(ErrorTypeEnum.FILE_NOT_FOUND);

      jest.spyOn(service, 'selectOne').mockImplementation(async () => new FileEntity());

      return service.deleteOne({}).catch((err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err).toStrictEqual(error);
      });
    });
  });
});
