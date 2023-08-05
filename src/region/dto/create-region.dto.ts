import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({ example: 'Tashkent', description: 'Region name' })
  @IsString()
  name: string;
}
