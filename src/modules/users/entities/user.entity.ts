import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from "class-transformer";
import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { FileEntity } from 'src/modules/user-files/entities';

/**
 * [description]
 */
export enum RolesEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

/**
 * [description]
 */
export enum StatusEnum {
  DEACTIVATED = 'DEACTIVATED',
  ACTIVATED = 'ACTIVATED',
  PENDING = 'PENDING',
}

/**
 * [description]
 */
export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNSPECIFIED = 'UNSPECIFIED',
}

/**
 * [description]
 */
@Entity('users')
export class UserEntity extends BaseEntity {
  /**
   * [description]
   */
  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  /**
   * [description]
   */
  @Exclude()
  @ApiHideProperty()
  @Index()
  @Column({ type: 'varchar', length: 64 })
  public ppid: string;

  /**
   * [description]
   */
  @ApiProperty({ enum: StatusEnum, default: StatusEnum.PENDING })
  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.PENDING })
  public readonly status: StatusEnum;

  /**
   * [description]
   */
  @ApiProperty({ enum: RolesEnum, default: RolesEnum.USER })
  @Column({ type: 'enum', enum: RolesEnum, default: RolesEnum.USER })
  public readonly role: RolesEnum;

  /**
   * [description]
   */
  // @IsDate()
  // @ApiProperty({ type: Date, example: new Date() })
  // @Column({ type: Date, default: null })
  // public readonly birthday: Date;

  /**
   * [description]
   */
  @ApiProperty({ maxLength: 50 })
  @Column({ type: 'varchar', length: 50 })
  public readonly firstName: string;

  /**
   * [description]
   */
  @ApiProperty({ maxLength: 50 })
  @Column({ type: 'varchar', length: 50 })
  public readonly lastName: string;

  /**
   * [description]
   */
  @ApiProperty({ maxLength: 50 })
  @Column({ type: 'varchar', length: 50 })
  public readonly username: string;

  /**
   * [description]
   */
  @ApiProperty({ maxLength: 20 })
  @Column({ type: 'varchar', length: 20, unique: true })
  public readonly phoneNumber: string;

  /**
   * [description]
   */
  @ApiProperty({ maxLength: 30 })
  @Column({ type: 'varchar', length: 20, unique: true })
  public readonly telegram: string;

  @ApiProperty({ maxLength: 30 })
  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  public readonly instagram: string;

  /**
   * [description]
   */
  @Exclude()
  @ApiHideProperty()
  @Column({ type: 'varchar', length: 64 })
  public password: string;

  /**
   * [description]
   */
  @Exclude()
  @ApiHideProperty()
  public _password: string;

  /**
   * [description]
   * @private
   */
  @AfterLoad()
  private loadTempPassword(): void {
    this._password = this.password;
  }

  /**
   * [description]
   */
  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword(): Promise<void> {
    if (this.password && this.password !== this._password) {
      this.password = await bcrypt.hash(this.password, 8);
    }

    this.ppid = crypto
      .createHash('sha256')
      .update(this.password)
      .update(this.status)
      .update(this.role)
      .digest('base64');
  }

  /**
   * [description]
   * @param password
   */
  public async comparePassword(password: UserEntity['password']): Promise<boolean> {
    return new Promise((resolve, reject) => {
      return bcrypt.compare(password, this.password, (err, same) => {
        if (err) reject(err);
        return same ? resolve(same) : reject(same);
      });
    });
  }

  /**
   * [description]
   */
  @JoinColumn()
  @Transform(({ value }) => {
    if (value.length != 0) {
      return value[0].src;
    }
    return null;
  })
  @ApiProperty({ type: () => String })
  @OneToMany(() => FileEntity, ({ owner }) => owner, { nullable: true, cascade: true, eager: true })
  public avatar?: Partial<FileEntity>;

  /**
   * [description]
   */
  @ApiHideProperty()
  @OneToMany(() => FileEntity, ({ owner }) => owner, {
    nullable: true,
    cascade: true,
  })
  public readonly files: Partial<FileEntity>[];

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
