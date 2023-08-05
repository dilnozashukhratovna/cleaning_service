import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface Employee_serviceAttr {
  employee_id: number;
  service_type_id: number;
  price: number;
}

@Table({ tableName: 'employee_service' })
export class Employee_service extends Model<
  Employee_service,
  Employee_serviceAttr
> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Employee id' })
  @Column({
    type: DataType.INTEGER,
  })
  employee_id: number;

  @ApiProperty({ example: 1, description: 'Service type id' })
  @Column({
    type: DataType.INTEGER,
  })
  service_type_id: number;

  @ApiProperty({ example: 100.0, description: 'Employee service price' })
  @Column({
    type: DataType.DECIMAL,
  })
  price: number;
}
