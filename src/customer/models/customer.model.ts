import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Location } from '../../location/models/location.model';
import { Rating } from '../../rating/models/rating.model';
import { Schedule } from '../../schedule/models/schedule.model';

interface CustomerAttr {
  first_name: string;
  last_name: string;
  telegram_link: string;
  email: string;
  password: string;
  customer_photo: string;
  phone_number: string;
  birthdate: Date;
  is_active: boolean;
  location_id: number;
  hashed_refresh_token: string;
  activation_link: string;
}

@Table({ tableName: 'customer' })
export class Customer extends Model<Customer, CustomerAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Anna', description: 'Customer first name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Smith', description: 'Customer last name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({ example: 'anna_01', description: 'Customer telegram link' })
  @Column({
    type: DataType.STRING,
  })
  telegram_link: string;

  @ApiProperty({
    example: 'anna01@gmail.com',
    description: 'Customer email',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: 'Pa$$w0rd', description: 'Customer password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'Customer photo' })
  @Column({
    type: DataType.STRING,
  })
  customer_photo: string;

  @ApiProperty({
    example: '+998998887766',
    description: 'Customer phone number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone_number: string;

  @ApiProperty({ example: '2000-01-01', description: 'Customer birthdate' })
  @Column({
    type: DataType.DATE,
  })
  birthdate: Date;

  @ApiProperty({ example: 'false', description: 'Is customer active' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ForeignKey(() => Location)
  @ApiProperty({ example: 1, description: 'Customer location' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  location_id: number;

  @ApiProperty({
    example: 'token',
    description: 'Customer token',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @BelongsTo(() => Location)
  location: Location;

  @HasMany(() => Rating)
  ratings: Rating[];

  @HasMany(() => Schedule)
  schedules: Schedule[];
}
