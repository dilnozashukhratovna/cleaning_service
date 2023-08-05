import { Injectable } from '@nestjs/common';
import { Employee_service } from './models/employee_service.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEmployee_serviceDto } from './dto/create-employee_service.dto';
import { UpdateEmployee_serviceDto } from './dto/update-employee_service.dto';

@Injectable()
export class Employee_serviceService {
  constructor(@InjectModel(Employee_service) private employee_serviceRepo: typeof Employee_service) {}

  async createEmployee_service(createEmployee_serviceDto: CreateEmployee_serviceDto): Promise<Employee_service> {
    const employee_service = await this.employee_serviceRepo.create(createEmployee_serviceDto);
    return employee_service;
  }

  async getAllEmployee_service(): Promise<Employee_service[]> {
    const employee_services = await this.employee_serviceRepo.findAll({ include: { all: true } });
    return employee_services;
  }

  async getEmployee_serviceById(id: number): Promise<Employee_service> {
    const employee_service = await this.employee_serviceRepo.findByPk(id);
    return employee_service;
  }

  async deleteEmployee_serviceById(id: number) {
    const employee_service = await this.employee_serviceRepo.destroy({ where: { id } });
    return employee_service;
  }

  async updateEmployee_service(id: number, updateEmployee_serviceDto: UpdateEmployee_serviceDto) {
    const employee_service = await this.employee_serviceRepo.update(updateEmployee_serviceDto, {
      where: { id },
      returning: true,
    });

    return employee_service[1][0].dataValues;
  }
}
