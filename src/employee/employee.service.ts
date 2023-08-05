import { Injectable } from '@nestjs/common';
import { Employee } from './models/employee.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(@InjectModel(Employee) private employeeRepo: typeof Employee) {}

  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeRepo.create(createEmployeeDto);
    return employee;
  }

  async getAllEmployee(): Promise<Employee[]> {
    const employees = await this.employeeRepo.findAll({ include: { all: true } });
    return employees;
  }

  async getEmployeeById(id: number): Promise<Employee> {
    const employee = await this.employeeRepo.findByPk(id);
    return employee;
  }

  async deleteEmployeeById(id: number) {
    const employee = await this.employeeRepo.destroy({ where: { id } });
    return employee;
  }

  async updateEmployee(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeeRepo.update(updateEmployeeDto, {
      where: { id },
      returning: true,
    });

    return employee[1][0].dataValues;
  }
}
