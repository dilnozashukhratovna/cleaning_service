import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './models/employee.model';

@Module({
  imports: [SequelizeModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
