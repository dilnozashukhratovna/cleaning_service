import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateRegionDto {
  @ApiProperty({ example: 'Tashkent', description: 'Region name' })
  @IsString()
  name?: string;
}
