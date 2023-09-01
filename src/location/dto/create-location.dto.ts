import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ example: 1, description: 'District id' })
  @IsNumber()
  district_id: number;

  @ApiProperty({ example: 1, description: 'Region id' })
  @IsNumber()
  region_id: number;

  @ApiProperty({ example: 7, description: 'Home number' })
  @IsNumber()
  home_number: number;

  @ApiProperty({ example: 'Something', description: 'Street name' })
  @IsString()
  street_name: string;

  @ApiProperty({
    example: 'Located opposite of the market',
    description: 'Extra info for location',
  })
  @IsString()
  extra_info: string;
}
