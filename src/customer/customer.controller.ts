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
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Customer } from './models/customer.model';
import { Response } from 'express';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { CustomerGuard } from '../guards/customer.guard';
import { AdminGuard } from '../guards/admin.guard';


@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Create customer' })
  @Post('create')
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = this.customerService.createCustomer(createCustomerDto);
    return customer;
  }

  @ApiOperation({ summary: 'Get all customers' })
  @UseGuards(AdminGuard)
  @Get('all')
  async getAllCustomer() {
    return this.customerService.getAllCustomer();
  }

  @ApiOperation({ summary: 'Get customer by id' })
  @UseGuards(CustomerGuard)
  @Get(':id')
  async getCustomerById(@Param('id') id: string) {
    return this.customerService.getCustomerById(+id);
  }

  @ApiOperation({ summary: 'Delete customer' })
  @UseGuards(CustomerGuard)
  @Delete(':id')
  async deleteCustomerById(@Param('id') id: string) {
    return this.customerService.deleteCustomerById(+id);
  }

  @ApiOperation({ summary: 'Update customer' })
  @UseGuards(CustomerGuard)
  @Put(':id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.updateCustomer(+id, updateCustomerDto);
  }

  // ================= AUTH ==================================================

  @ApiOperation({ summary: 'Signup Customer' })
  @ApiResponse({ status: 201, type: Customer })
  @Post('signup')
  signup(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.signup(createCustomerDto, res);
  }

  @ApiOperation({ summary: 'Login Customer' })
  @ApiResponse({ status: 200, type: Customer })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginCustomerDto: LoginCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.login(loginCustomerDto, res);
  }

  @ApiOperation({ summary: 'logout Customer' })
  @UseGuards(CustomerGuard)
  @ApiResponse({ status: 200, type: Customer })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'Activate Customer' })
  @ApiResponse({ status: 200, type: [Customer] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.customerService.activate(link);
  }

  @Post(':id/refresh')
  @UseGuards(CustomerGuard)
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.refreshToken(+id, refreshToken, res);
  }
}
