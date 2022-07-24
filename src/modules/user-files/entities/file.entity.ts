import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Multipart } from 'fastify-multipart';
import { Expose } from 'class-transformer';
import {
  Check,
  Column,
  Entity,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '../../users/entities';

/**
 * [description]
 */
@Entity('files')
export class FileEntity extends BaseEntity implements Partial<Multipart> {
  /**
   * [description]
   */
  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  /**
   * [description]
   */
  @Expose({ toClassOnly: true })
  @ApiProperty({ readOnly: true })
  get src(): string {
    return `${process.env.CDN}/${this.id}`;
  }

  /**
   * [description]
   */
  @ApiHideProperty()
  @ManyToOne(() => UserEntity, ({ files }) => files, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  public readonly owner: Partial<UserEntity>;

  /**
   * [description]
   */
  @Column({ type: 'varchar', length: 256 })
  @ApiProperty({ maxLength: 256, readOnly: true })
  public readonly filename: string;

  /**
   * [description]
   */
  @Check(`"fileSize" > 0`)
  @Column({ type: 'bigint' })
  @ApiProperty({ readOnly: true, minimum: 1, maximum: 9223372036854775807 })
  public readonly fileSize: string;

  /**
   * [description]
   */
  @Column({ type: 'varchar', length: 256 })
  @ApiProperty({ maxLength: 256, readOnly: true })
  public readonly mimetype: string;

  /**
   * [description]
   */
  @Column({ type: 'varchar', length: 7 })
  @ApiProperty({ maxLength: 7, readOnly: true })
  public readonly encoding: string;

  /**
   * [description]
   */
  @Column({ type: 'varchar', length: 256 })
  @ApiProperty({ maxLength: 256, readOnly: true })
  public readonly extname: string;

  /**
   * [description]
   */
  @ApiProperty({ readOnly: true })
  @CreateDateColumn({
    readonly: true,
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  public readonly createdAt: Date;

  /**
   * [description]
   */
  @ApiProperty({ readOnly: true })
  @UpdateDateColumn({
    readonly: true,
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  public readonly updatedAt: Date;
}
