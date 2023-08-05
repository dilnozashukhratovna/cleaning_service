import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface RatingAttr {
  employee_id: number;
  customer_id: number;
  rating_value: number;
  comment: string;
}

@Table({ tableName: 'rating' })
export class Rating extends Model<Rating, RatingAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Employee id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  employee_id: number;

  @ApiProperty({ example: 1, description: 'Customer id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customer_id: number;

  @ApiProperty({ example: 4.5, description: 'Rating value' })
  @Column({
    type: DataType.DECIMAL,
  })
  rating_value: number;

  @ApiProperty({ example: 'Good job!', description: 'Comment for employee' })
  @Column({
    type: DataType.TEXT,
  })
  comment: string;
}
