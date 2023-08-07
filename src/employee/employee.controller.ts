import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Employee } from './models/employee.model';
import { Response } from 'express';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { AdminGuard } from '../guards/admin.guard';
import { EmployeeGuard } from '../guards/employee.guard';
import { EmployeeSelfGuard } from '../guards/employee.self.guard';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({ summary: 'Get all employees' })
  @UseGuards(AdminGuard)
  @Get('all')
  async getAllEmployee() {
    return this.employeeService.getAllEmployee();
  }

  @ApiOperation({ summary: 'Get employee by id' })
  @UseGuards(EmployeeSelfGuard)
  @UseGuards(EmployeeGuard)
  @Get(':id')
  async getEmployeeById(@Param('id') id: string) {
    return this.employeeService.getEmployeeById(+id);
  }

  @ApiOperation({ summary: 'Delete employee' })
  @UseGuards(EmployeeSelfGuard)
  @UseGuards(EmployeeGuard)
  @Delete(':id')
  async deleteEmployeeById(@Param('id') id: string) {
    return this.employeeService.deleteEmployeeById(+id);
  }

  @ApiOperation({ summary: 'Update employee' })
  @UseGuards(EmployeeSelfGuard)
  @UseGuards(EmployeeGuard)
  @Put(':id')
  async updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.updateEmployee(+id, updateEmployeeDto);
  }

  // ================= AUTH ==================================================

  @ApiOperation({ summary: 'Signup Employee' })
  @ApiResponse({ status: 201, type: Employee })
  @Post('signup')
  signup(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.employeeService.signup(createEmployeeDto, res);
  }

  @ApiOperation({ summary: 'Login Employee' })
  @ApiResponse({ status: 200, type: Employee })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginEmployeeDto: LoginEmployeeDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.employeeService.login(loginEmployeeDto, res);
  }

  @ApiOperation({ summary: 'logout Employee' })
  @UseGuards(EmployeeGuard)
  @ApiResponse({ status: 200, type: Employee })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.employeeService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'Activate Employee' })
  @ApiResponse({ status: 200, type: [Employee] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.employeeService.activate(link);
  }

  @UseGuards(EmployeeSelfGuard)
  @UseGuards(EmployeeGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.employeeService.refreshToken(+id, refreshToken, res);
  }
}
