import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface AdminAttr {
  full_name: string;
  telegram_link: string;
  email: string;
  password: string;
  admin_photo: string;
  is_creator: boolean;
  is_active: boolean;
  hashed_refresh_token: string;
  activation_link: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John Green', description: 'Admin full name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @ApiProperty({ example: 'john_01', description: 'Admin telegram link' })
  @Column({
    type: DataType.STRING,
  })
  telegram_link: string;

  @ApiProperty({ example: 'john01@gmail.com', description: 'Admin email' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: 'Pa$$w0rd', description: 'Admin password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'Admin photo' })
  @Column({
    type: DataType.STRING,
  })
  admin_photo: string;

  @ApiProperty({ example: 'false', description: 'Is admin creator' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;

  @ApiProperty({ example: 'false', description: 'Is admin active' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'token',
    description: 'Admin token',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
}
