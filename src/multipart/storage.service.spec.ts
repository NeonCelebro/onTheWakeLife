import { Test, TestingModule } from '@nestjs/testing';
import {
  NotFoundException,
  PayloadTooLargeException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';

import * as utils from 'test/utils';
import * as stream from 'stream';
import * as fs from 'fs';

import { ConfigModule, ConfigService } from 'src/config';
import { ErrorTypeEnum } from 'src/common/enums';

import { StorageService } from './storage.service';
import { UploadedFile } from './dto';

describe('StorageService', () => {
  const configService = new ConfigService();
  const destination = configService.getDest('STORE_DEST');
  let service: StorageService;

  beforeAll(async () => {
    fs.rmdirSync(destination, { recursive: true });

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [StorageService],
    }).compile();

    service = module.get<StorageService>(StorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create service instance', () => {
    it('should be create dest folder', () => {
      const destination = configService.getDest('STORE_DEST');
      fs.rmdirSync(destination, { recursive: true });
      expect(fs.existsSync(destination)).toEqual(false);
      expect(new StorageService(configService)).toBeDefined();
      expect(fs.existsSync(destination)).toEqual(true);
    });
  });

  describe('create service instance', () => {
    it('should be create dest folder', () => {
      const destination = configService.getDest('STORE_DEST');
      expect(fs.existsSync(destination)).toEqual(true);
      expect(new StorageService(configService)).toBeDefined();
      expect(fs.existsSync(destination)).toEqual(true);
    });
  });

  describe('createOne', () => {
    it('should be create file', async () => {
      const data = utils.createMockFileMeta();
      const response = await service.createOne(data);
      expect(response).toBeInstanceOf(UploadedFile);
    });

    it('should be return unexpected file', async () => {
      const { filename, encoding, mimetype } = utils.createMockFileMeta();
      const error = new NotFoundException(ErrorTypeEnum.FILE_NOT_FOUND);
      const file = new stream.Readable();
      const data = { file, filename, encoding, mimetype };
      file.destroy(new Error());
      try {
        await service.createOne(data);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err).toEqual(error);
      }
    });

    it('should be return payload too large exception', async () => {
      const { filename, encoding, mimetype } = utils.createMockFileMeta();
      const file = new stream.Readable();
      file['truncated'] = true;
      const data = { file, filename, encoding, mimetype };
      const error = new PayloadTooLargeException();
      try {
        await service.createOne(data);
      } catch (err) {
        expect(err).toBeInstanceOf(PayloadTooLargeException);
        expect(err).toEqual(error);
      }
    });

    it('should be return unsupported media type exception', async () => {
      const { filename, encoding } = utils.createMockFileMeta();
      const file = new stream.Readable();
      const data = { file, filename, encoding, mimetype: 'broken' };
      const error = new UnsupportedMediaTypeException();
      try {
        await service.createOne(data);
      } catch (err) {
        expect(err).toBeInstanceOf(UnsupportedMediaTypeException);
        expect(err).toEqual(error);
      }
    });
  });

  describe('selectOne', () => {
    it('should be return file', async () => {
      const { filename, mimetype } = utils.createMockFile();
      await service.selectOne(utils.createRepMock(mimetype), { filename, mimetype });
    });

    it('should be return resize by width file', async () => {
      const { filename, mimetype } = utils.createMockFile();
      await service.selectOne(utils.createRepMock(mimetype), { filename, mimetype }, { width: 1 });
    });

    it('should be return resize by height file', async () => {
      const { filename, mimetype } = utils.createMockFile();
      await service.selectOne(utils.createRepMock(mimetype), { filename, mimetype }, { height: 1 });
    });

    it('should be return not found exception', async () => {
      const filename = 'broken';
      const mimetype = 'broken';
      const error = new NotFoundException(ErrorTypeEnum.FILE_NOT_FOUND);
      try {
        await service.selectOne(utils.createRepMock(), { filename, mimetype });
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err).toEqual(error);
      }
    });
  });

  describe('deleteOne', () => {
    it('should be delete file', () => {
      const { filePath, filename } = utils.createMockFile();
      service.deleteOne(filename);
      expect(fs.existsSync(filePath)).toEqual(false);
    });

    it('should be return not found exception', () => {
      const filename = 'broken';
      const error = new NotFoundException(ErrorTypeEnum.FILE_NOT_FOUND);
      try {
        service.deleteOne(filename);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err).toEqual(error);
      }
    });
  });

  afterAll(async () => {
    fs.rmdirSync(destination, { recursive: true });
  });
});
