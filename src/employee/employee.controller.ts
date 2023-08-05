import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({ summary: 'Create employee' })
  @Post('create')
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeService.createEmployee(createEmployeeDto);
    return employee;
  }

  @ApiOperation({ summary: "Get all employees" })
  @Get('all')
  async getAllEmployee() {
    return this.employeeService.getAllEmployee();
  }

  @ApiOperation({ summary: "Get employee by id" })
  @Get(':id')
  async getEmployeeById(@Param('id') id: string) {
    return this.employeeService.getEmployeeById(+id);
  }

  @ApiOperation({ summary: "Delete employee" })
  @Delete(':id')
  async deleteEmployeeById(@Param('id') id: string) {
    return this.employeeService.deleteEmployeeById(+id);
  }

  @ApiOperation({ summary: "Update employee" })
  @Put(':id')
  async updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.updateEmployee(+id, updateEmployeeDto);
  }
}
