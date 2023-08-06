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
import { Service_type } from '../../service_type/models/service_type.model';

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

  @ForeignKey(() => Employee)
  @ApiProperty({ example: 1, description: 'Employee id' })
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  employee_id: number;

  @ForeignKey(() => Service_type)
  @ApiProperty({ example: 1, description: 'Service type id' })
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  service_type_id: number;

  @ApiProperty({ example: 100.0, description: 'Employee service price' })
  @Column({
    type: DataType.DECIMAL,
  })
  price: number;

  @BelongsTo(() => Employee)
  employee: Employee;

  @BelongsTo(() => Service_type)
  service_type: Service_type;
}
