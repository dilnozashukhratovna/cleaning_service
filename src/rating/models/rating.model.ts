import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employee/models/employee.model';
import { Customer } from '../../customer/models/customer.model';

interface RatingAttr {
  employee_id: number;
  customer_id: number;
  rating_value: number;
  comment: string;
}

@Table({ tableName: 'rating' })
export class Rating extends Model<Rating, RatingAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Employee)
  @ApiProperty({ example: 1, description: 'Employee id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  employee_id: number;

  @ForeignKey(() => Customer)
  @ApiProperty({ example: 1, description: 'Customer id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customer_id: number;

  @ApiProperty({ example: 4.5, description: 'Rating value' })
  @Column({
    type: DataType.DECIMAL,
  })
  rating_value: number;

  @ApiProperty({ example: 'Good job!', description: 'Comment for employee' })
  @Column({
    type: DataType.TEXT,
  })
  comment: string;

  @BelongsTo(() => Employee)
  employee: Employee;

  @BelongsTo(() => Customer)
  customer: Customer;
}
