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
import { Payment } from '../../payment/models/payment.model';
import { Customer } from '../../customer/models/customer.model';
import { Employee } from '../../employee/models/employee.model';
import { Service_type } from '../../service_type/models/service_type.model';

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

  @ForeignKey(() => Customer)
  @ApiProperty({ example: 1, description: 'Customer id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customer_id: number;

  @ForeignKey(() => Employee)
  @ApiProperty({ example: 1, description: 'Employee id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  employee_id: number;

  @ForeignKey(() => Service_type)
  @ApiProperty({ example: 1, description: 'Service type id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
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

  @BelongsTo(() => Customer)
  customer: Customer;

  @BelongsTo(() => Employee)
  employee: Employee;

  @BelongsTo(() => Service_type)
  service_type: Service_type;

  @HasMany(() => Payment)
  payments: Payment[];
}
