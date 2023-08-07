import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateScheduleDto {
  @ApiProperty({ example: 1, description: 'Customer id' })
  @IsNumber()
  @IsNotEmpty()
  customer_id?: number;

  @ApiProperty({ example: 1, description: 'Employee id' })
  @IsNotEmpty()
  @IsNumber()
  employee_id?: number;

  @ApiProperty({ example: 1, description: 'Service type id' })
  @IsNotEmpty()
  @IsNumber()
  service_type_id?: number;

  @ApiProperty({ example: '2023-01-09', description: 'Scheduled date' })
  @IsNotEmpty()
  @IsString()
  scheduled_date?: Date;

  @ApiProperty({ example: '10 am', description: 'Starting time' })
  @IsNotEmpty()
  @IsString()
  start_time?: string;

  @ApiProperty({ example: '1:30 pm', description: 'Finishing time' })
  @IsNotEmpty()
  @IsString()
  finish_time?: string;

  @ApiProperty({ example: 'DONE', description: 'Status' })
  @IsNotEmpty()
  @IsString()
  status?: string;
}
