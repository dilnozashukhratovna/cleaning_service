import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Employee_serviceService } from './employee_service.service';
import { CreateEmployee_serviceDto } from './dto/create-employee_service.dto';
import { UpdateEmployee_serviceDto } from './dto/update-employee_service.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Employee_service')
@Controller('employee_service')
export class Employee_serviceController {
  constructor(private readonly employee_serviceService: Employee_serviceService) {}

  @ApiOperation({ summary: 'Create service type' })
  @Post('create')
  async createEmployee_service(
    @Body() createEmployee_serviceDto: CreateEmployee_serviceDto,
  ) {
    const employee_service = this.employee_serviceService.createEmployee_service(
      createEmployee_serviceDto,
    );
    return employee_service;
  }

  @ApiOperation({ summary: 'Get all employee services' })
  @Get('all')
  async getAllEmployee_service() {
    return this.employee_serviceService.getAllEmployee_service();
  }

  @ApiOperation({ summary: 'Get employee service by id' })
  @Get(':id')
  async getEmployee_serviceById(@Param('id') id: string) {
    return this.employee_serviceService.getEmployee_serviceById(+id);
  }

  @ApiOperation({ summary: 'Delete employee service' })
  @Delete(':id')
  async deleteEmployee_serviceById(@Param('id') id: string) {
    return this.employee_serviceService.deleteEmployee_serviceById(+id);
  }

  @ApiOperation({ summary: 'Update employee service' })
  @Put(':id')
  async updateEmployee_service(
    @Param('id') id: string,
    @Body() updateEmployee_serviceDto: UpdateEmployee_serviceDto,
  ) {
    return this.employee_serviceService.updateEmployee_service(
      +id,
      updateEmployee_serviceDto,
    );
  }
}
