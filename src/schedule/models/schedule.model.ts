import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface ScheduleAttr {
  customer_id: number;
  employee_id: number;
  service_type_id: number;
  scheduled_date: Date;
  start_time: string;
  finish_time: string;
  status: string;
}

@Table({ tableName: 'schedule' })
export class Schedule extends Model<Schedule, ScheduleAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Customer id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customer_id: number;

  @ApiProperty({ example: 1, description: 'Employee id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  employee_id: number;

  @ApiProperty({ example: 1, description: 'Service type id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  service_type_id: number;

  @ApiProperty({ example: '2023-01-09', description: 'Scheduled date' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  scheduled_date: Date;

  @ApiProperty({ example: '10 am', description: 'Starting time' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  start_time: string;

  @ApiProperty({ example: '1:30 pm', description: 'Finishing time' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  finish_time: string;

  @ApiProperty({ example: 'DONE', description: 'Status' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;
}
