import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Create payment' })
  @Post('create')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentService.createPayment(createPaymentDto);
    return payment;
  }

  @ApiOperation({ summary: "Get all payments" })
  @Get('all')
  async getAllPayment() {
    return this.paymentService.getAllPayment();
  }

  @ApiOperation({ summary: "Get payment by id" })
  @Get(':id')
  async getPaymentById(@Param('id') id: string) {
    return this.paymentService.getPaymentById(+id);
  }

  @ApiOperation({ summary: "Delete payment" })
  @Delete(':id')
  async deletePaymentById(@Param('id') id: string) {
    return this.paymentService.deletePaymentById(+id);
  }

  @ApiOperation({ summary: "Update payment" })
  @Put(':id')
  async updatePayment(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentService.updatePayment(+id, updatePaymentDto);
  }
}
