import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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

  @ApiOperation({ summary: "Get all customers" })
  @Get('all')
  async getAllCustomer() {
    return this.customerService.getAllCustomer();
  }

  @ApiOperation({ summary: "Get customer by id" })
  @Get(':id')
  async getCustomerById(@Param('id') id: string) {
    return this.customerService.getCustomerById(+id);
  }

  @ApiOperation({ summary: "Delete customer" })
  @Delete(':id')
  async deleteCustomerById(@Param('id') id: string) {
    return this.customerService.deleteCustomerById(+id);
  }

  @ApiOperation({ summary: "Update customer" })
  @Put(':id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.updateCustomer(+id, updateCustomerDto);
  }
}
