import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../../company/models/company.model';

interface BuilderAttr {
  full_name: string;
  birth_day: Date;
  salary: number;
  companyId: number;
}

@Table({ tableName: 'builder' })
export class Builder extends Model<Builder, BuilderAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "John Green", description: 'Builder full name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @ApiProperty({ example: "2001-01-01", description: 'Builder birth date' })
  @Column({
    type: DataType.DATE,
  })
  birth_day: Date;

  @ApiProperty({ example: 99.999, description: 'Builder salary' })
  @Column({
    type: DataType.DECIMAL,
  })
  salary: number;

  @ForeignKey(() => Company)
  @ApiProperty({ example: 1, description: 'Builder company id' })
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;
}
