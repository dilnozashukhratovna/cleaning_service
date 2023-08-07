import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateDistrictDto {
  @ApiProperty({ example: 'Mirobod', description: 'District name' })
  @IsString()
  name?: string;
}
