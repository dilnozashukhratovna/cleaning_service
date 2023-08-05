import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDistrictDto {
  @ApiProperty({ example: 'Mirobod', description: 'District name' })
  @IsString()
  name: string;
}
