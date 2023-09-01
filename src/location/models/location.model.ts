import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../../customer/models/customer.model';
import { District } from '../../district/models/district.model';
import { Region } from '../../region/models/region.model';

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

  @ForeignKey(() => District)
  @ApiProperty({ example: 1, description: 'District id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  district_id: number;

  @ForeignKey(() => Region)
  @ApiProperty({ example: 1, description: 'Region id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
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

  @BelongsTo(() => District)
  district: District;

  @BelongsTo(() => Region)
  region: Region;

  @HasMany(() => Customer)
  customers: Customer[];
}
