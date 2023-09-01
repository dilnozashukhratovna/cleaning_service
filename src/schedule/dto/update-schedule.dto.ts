import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { CreateScheduleDto } from './create-schedule.dto';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {
  @ApiProperty({ example: 1, description: 'Customer id' })
  @IsNumber()
  customer_id?: number;

  @ApiProperty({ example: 1, description: 'Employee id' })
  @IsNumber()
  employee_id?: number;

  @ApiProperty({ example: 1, description: 'Service type id' })
  @IsNumber()
  service_type_id?: number;

  @ApiProperty({ example: '2023-01-09', description: 'Scheduled date' })
  @IsString()
  scheduled_date?: Date;

  @ApiProperty({ example: '10 am', description: 'Starting time' })
  @IsString()
  start_time?: string;

  @ApiProperty({ example: '1:30 pm', description: 'Finishing time' })
  @IsString()
  finish_time?: string;

  @ApiProperty({ example: 'DONE', description: 'Status' })
  @IsString()
  status?: string;
}
