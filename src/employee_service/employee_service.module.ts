import { Module } from '@nestjs/common';
import { Employee_serviceController } from './employee_service.controller';
import { Employee_serviceService } from './employee_service.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee_service } from './models/employee_service.model';

@Module({
  imports: [SequelizeModule.forFeature([Employee_service])],
  controllers: [Employee_serviceController],
  providers: [Employee_serviceService],
})
export class Employee_serviceModule {}
