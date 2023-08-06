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
import { Employee_service } from '../../employee_service/models/employee_service.model';
import { Rating } from '../../rating/models/rating.model';
import { Schedule } from '../../schedule/models/schedule.model';

interface EmployeeAttr {
  first_name: string;
  last_name: string;
  telegram_link: string;
  email: string;
  password: string;
  employee_photo: string;
  phone_number: string;
  passport_seria: string;
  rating: number;
  gender: string;
  is_active: boolean;
  hashed_refresh_token: string;
  activation_link: string;
}

@Table({ tableName: 'employee' })
export class Employee extends Model<Employee, EmployeeAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Rosie', description: 'Employee first name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Alison', description: 'Employee last name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({ example: 'rosie_01', description: 'Employee telegram link' })
  @Column({
    type: DataType.STRING,
  })
  telegram_link: string;

  @ApiProperty({
    example: 'rosie01@gmail.com',
    description: 'Employee email',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: 'Pa$$w0rd', description: 'Employee password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'Employee photo' })
  @Column({
    type: DataType.STRING,
  })
  employee_photo: string;

  @ApiProperty({
    example: '+998998887766',
    description: 'Employee phone number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone_number: string;

  @ApiProperty({
    example: 'passport seria',
    description: 'Employee passport seria',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passport_seria: string;

  @ApiProperty({
    example: 4.5,
    description: 'Employee rating',
  })
  @Column({
    type: DataType.DECIMAL,
  })
  rating: number;

  @ApiProperty({
    example: 'female',
    description: 'Employee gender',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  gender: string;

  @ApiProperty({ example: 'false', description: 'Is employee active' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'token',
    description: 'Employee token',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @HasMany(() => Employee_service)
  employee_services: Employee_service[];

  @HasMany(() => Rating)
  ratings: Rating[];

  @HasMany(() => Schedule)
  schedules: Schedule[];
}
