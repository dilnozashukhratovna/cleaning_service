import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNumber, IsString } from 'class-validator';

export class UpdateEmployee_serviceDto {
  @ApiProperty({ example: 1, description: 'Employee id' })
  @IsNumber()
  employee_id?: number;

  @ApiProperty({ example: 1, description: 'Service type id' })
  @IsNumber()
  service_type_id?: number;

  @ApiProperty({ example: 100.0, description: 'Employee service price' })
  @IsNumber()
  price?: number;
}
