import { Injectable } from '@nestjs/common';
import { Customer } from './models/customer.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer) private customerRepo: typeof Customer) {}

  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepo.create(createCustomerDto);
    return customer;
  }

  async getAllCustomer(): Promise<Customer[]> {
    const customers = await this.customerRepo.findAll({ include: { all: true } });
    return customers;
  }

  async getCustomerById(id: number): Promise<Customer> {
    const customer = await this.customerRepo.findByPk(id);
    return customer;
  }

  async deleteCustomerById(id: number) {
    const customer = await this.customerRepo.destroy({ where: { id } });
    return customer;
  }

  async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepo.update(updateCustomerDto, {
      where: { id },
      returning: true,
    });

    return customer[1][0].dataValues;
  }
}
