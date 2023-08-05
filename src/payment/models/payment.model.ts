import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface PaymentAttr {
  type: string;
  customer_card: string;
  schedule_service_id: number;
  total_price: number;
}

@Table({ tableName: 'payment' })
export class Payment extends Model<Payment, PaymentAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Cash', description: 'Payment type' })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  type: string;

  @ApiProperty({ example: '98768686687', description: 'Customer card number' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  customer_card: string;

  @ApiProperty({ example: 1, description: 'Schedule information' })
  @Column({
    type: DataType.STRING,
  })
  schedule_service_id: number;

  @ApiProperty({ example: 120.0, description: 'Full price' })
  @Column({
    type: DataType.STRING,
  })
  total_price: number;
}
