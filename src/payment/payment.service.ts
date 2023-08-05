import { Injectable } from '@nestjs/common';
import { Payment } from './models/payment.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment) private paymentRepo: typeof Payment) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = await this.paymentRepo.create(createPaymentDto);
    return payment;
  }

  async getAllPayment(): Promise<Payment[]> {
    const payments = await this.paymentRepo.findAll({ include: { all: true } });
    return payments;
  }

  async getPaymentById(id: number): Promise<Payment> {
    const payment = await this.paymentRepo.findByPk(id);
    return payment;
  }

  async deletePaymentById(id: number) {
    const payment = await this.paymentRepo.destroy({ where: { id } });
    return payment;
  }

  async updatePayment(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentRepo.update(updatePaymentDto, {
      where: { id },
      returning: true,
    });

    return payment[1][0].dataValues;
  }
}
