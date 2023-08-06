import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Customer]),
    JwtModule.register({ global: true }),
    MailModule
  ],
  controllers: [CustomerController],
  providers: [CustomerService, MailService],
})
export class CustomerModule {}
