import { Multipart } from 'fastify-multipart';
import { FastifyReply } from 'fastify';
import {
  Injectable,
  NotFoundException,
  PayloadTooLargeException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';

import * as crypto from 'crypto';
import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';

import { ErrorTypeEnum } from 'src/common/enums';
import { ConfigService } from 'src/config';

import { UploadedFile } from './dto';

/**
 * [description]
 */
@Injectable()
export class StorageService {
  /**
   * [description]
   */
  private readonly options = {
    mode: parseInt('0700', 8),
  };

  /**
   * [description]
   */
  private readonly allowedTypes: string[];

  /**
   * [description]
   */
  private readonly destination: string;

  /**
   * [description]
   * @param configService [description]
   */
  constructor(private readonly configService: ConfigService) {
    this.allowedTypes = this.configService.get('STORE_MIME_TYPE');
    this.destination = this.configService.getDest('STORE_DEST');

    if (!fs.existsSync(this.destination)) fs.mkdirSync(this.destination, this.options);
  }

  /**
   * [description]
   * @param data  [description]
   */
  public async createOne(data: Partial<Multipart>): Promise<UploadedFile> {
    if (data.file['truncated']) throw new PayloadTooLargeException();
    if (!this.allowedTypes.includes(data.mimetype)) throw new UnsupportedMediaTypeException();

    const { file, encoding, mimetype } = data;
    const extname = path.extname(data.filename);
    const filename = crypto.randomBytes(16).toString('hex');
    const filePath = path.join(this.destination, filename);

    let fileSize = 0;

    await new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(filePath, this.options);
      return file
        .on('data', (data) => (fileSize += data.length))
        .on('error', reject)
        .on('end', resolve)
        .pipe(stream);
    }).catch(() => this.deleteOne(filename));

    return new UploadedFile({
      extname,
      filename,
      mimetype,
      encoding,
      fileSize: fileSize.toString(),
    });
  }

  /**
   * [description]
   * @param rep     [description]
   * @param file    [description]
   * @param resize  [description]
   */
  public selectOne(
    rep: FastifyReply,
    file: Partial<Multipart>,
    resize?: sharp.ResizeOptions,
  ): FastifyReply {
    const fileDest = path.join(this.destination, file.filename);
    try {
      fs.statSync(fileDest);
      const stream = fs.createReadStream(fileDest, { autoClose: true });

      if (resize?.height || resize?.width) {
        return rep.type(file.mimetype).send(
          stream.pipe(sharp()).resize({
            ...resize,
            withoutEnlargement: true,
            fastShrinkOnLoad: true,
          }),
        );
      }

      return rep.type(file.mimetype).send(stream);
    } catch {
      throw new NotFoundException(ErrorTypeEnum.FILE_NOT_FOUND);
    }
  }

  /**
   * [description]
   * @param filename {string} [description]
   * @return {void}
   */
  public deleteOne(filename: string): void {
    const fileDest = path.join(this.destination, filename);
    try {
      return fs.unlinkSync(fileDest);
    } catch (e) {
      throw new NotFoundException(ErrorTypeEnum.FILE_NOT_FOUND);
    }
  }
}
