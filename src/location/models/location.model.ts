import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface LocationAttr {
  district_id?: number;
  region_id?: number;
  home_number?: number;
  street_name?: string;
  extra_info?: string;
}

@Table({ tableName: 'location' })
export class Location extends Model<Location, LocationAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'District id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  district_id: number;

  @ApiProperty({ example: 1, description: 'Region id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  region_id: number;

  @ApiProperty({ example: 7, description: 'Home number' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  home_number: number;

  @ApiProperty({ example: 'Something', description: 'Street name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street_name: string;

  @ApiProperty({
    example: 'Located opposite of the market',
    description: 'Extra info for location',
  })
  @Column({
    type: DataType.TEXT,
  })
  extra_info: string;
}
