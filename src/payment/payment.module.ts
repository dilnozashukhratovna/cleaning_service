import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';

@Module({
  imports: [SequelizeModule.forFeature([Payment])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
