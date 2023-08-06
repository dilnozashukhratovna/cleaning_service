import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateService_typeDto {
  @ApiProperty({ example: 'Washing car', description: 'Service type name' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Description for service type',
    description: 'Service type description',
  })
  @IsString()
  description: string;
}
