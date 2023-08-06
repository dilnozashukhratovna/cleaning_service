import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Employee } from './models/employee.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express'; 
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginEmployeeDto } from './dto/login-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee) private employeeRepo: typeof Employee,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.employeeRepo.create(createEmployeeDto);
    return employee;
  }

  async getAllEmployee(): Promise<Employee[]> {
    const employees = await this.employeeRepo.findAll({
      include: { all: true },
    });
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

  //REGISTRATION
  async signup(createEmployeeDto: CreateEmployeeDto, res: Response) {
    const employee = await this.employeeRepo.findOne({
      where: { email: createEmployeeDto.email },
    });
    if (employee) {
      throw new BadRequestException('Email already exists!');
    }
    if (createEmployeeDto.password !== createEmployeeDto.confirm_password) {
      throw new BadRequestException('Password is not match!');
    }

    const hashed_password = await bcrypt.hash(createEmployeeDto.password, 7);
    const newEmployee = await this.employeeRepo.create({
      ...createEmployeeDto,
      password: hashed_password,
    });
    const tokens = await this.getTokens(newEmployee);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    const updatedEmployee = await this.employeeRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newEmployee.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    try {
      await this.mailService.sendEmployeeConfirmation(updatedEmployee[1][0]);
    } catch (error) {
      console.log(error);
    }

    const response = {
      message: 'Employee registered',
      employee: updatedEmployee[1][0],
      tokens,
    };
    return response;
  }

  //GET TOKENS
  async getTokens(employee: Employee) {
    const jwtPayload = {
      id: employee.id,
      is_active: employee.is_active,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  //LOGIN
  async login(loginEmployeeDto: LoginEmployeeDto, res: Response) {
    const { email, password } = loginEmployeeDto;
    const employee = await this.employeeRepo.findOne({ where: { email } });
    if (!employee) {
      throw new UnauthorizedException('Employee not registered');
    }
    if (!employee.is_active) {
      throw new BadRequestException('Employee is not active');
    }
    const isMatchPass = await bcrypt.compare(password, employee.password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Employee not registered(pass)');
    }

    const tokens = await this.getTokens(employee);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedEmployee = await this.employeeRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: employee.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Employee logged in',
      employee: updatedEmployee[1][0],
      tokens,
    };
    return response;
  }

  //LOGOUT
  async logout(refreshToken: string, res: Response) {
    const employeeData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!employeeData) {
      throw new ForbiddenException('Employee not found');
    }
    const updatedEmployee = await this.employeeRepo.update(
      {
        hashed_refresh_token: null,
      },
      { where: { id: employeeData.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Employee logged out successfully',
      employee: updatedEmployee[1][0],
    };
    return response;
  }

  //REFRESH TOKEN
  async refreshToken(employee_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (employee_id != decodedToken['id']) {
      throw new BadRequestException('Employee not found');
    }

    const employee = await this.employeeRepo.findOne({
      where: { id: employee_id },
    });
    if (!employee || !employee.hashed_refresh_token) {
      throw new BadRequestException('Employee not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      employee.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(employee);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedEmployee = await this.employeeRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: employee.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Employee refreshed',
      employee: updatedEmployee[1][0],
      tokens,
    };
    return response;
  }

  // ACTIVATE
  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }
    const updatedEmployee = await this.employeeRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );

    if (!updatedEmployee[1][0]) {
      throw new BadRequestException('Employee already activated');
    }

    const response = {
      message: 'Employee activated successfully',
      employee: updatedEmployee,
    };
    return response;
  }
}
