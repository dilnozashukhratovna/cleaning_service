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
import { Schedule } from '../../schedule/models/schedule.model';

interface Service_typeAttr {
  name: string;
  description: string;
}

@Table({ tableName: 'service_type' })
export class Service_type extends Model<Service_type, Service_typeAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Washing car', description: 'Service type name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Description for service type',
    description: 'Service type description',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @HasMany(() => Employee_service)
  employee_services: Employee_service[];

  @HasMany(() => Schedule)
  schedules: Schedule[];
}
