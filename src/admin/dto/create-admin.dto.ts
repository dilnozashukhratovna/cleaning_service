import { ApiProperty } from '@nestjs/swagger';

export class CreateBuilderDto {
  @ApiProperty({ example: 'John Green', description: 'Builder full name' })
  full_name: string;
  @ApiProperty({ example: '2001-01-01', description: 'Builder birth date' })
  birth_day: Date;
  @ApiProperty({ example: 99.999, description: 'Builder salary' })
  salary: number;
  @ApiProperty({ example: 1, description: 'Builder company id' })
  companyId: number;
}
