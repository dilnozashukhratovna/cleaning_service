import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 'Cash', description: 'Payment type' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ example: '98768686687', description: 'Customer card number' })
  @IsString()
  customer_card: string;

  @ApiProperty({ example: 1, description: 'Schedule information' })
  @IsNumber()
  schedule_service_id: number;

  @ApiProperty({ example: 120.0, description: 'Full price' })
  @IsNumber()
  total_price: number;
}
