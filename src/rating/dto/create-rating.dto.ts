import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({ example: 1, description: 'Employee id' })
  @IsNumber()
  @IsNotEmpty()
  employee_id: number;

  @ApiProperty({ example: 1, description: 'Customer id' })
  @IsNumber()
  @IsNotEmpty()
  customer_id: number;

  @ApiProperty({ example: 4.5, description: 'Rating value' })
  @IsNumber()
  rating_value: number;

  @ApiProperty({ example: 'Good job!', description: 'Comment for employee' })
  @IsString()
  comment: string;
}
