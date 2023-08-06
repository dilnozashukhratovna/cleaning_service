import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Customer } from '../customer/models/customer.model';
import { Admin } from '../admin/models/admin.model';
import { Employee } from '../employee/models/employee.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendCustomerConfirmation(customer: Customer): Promise<void> {
    const url = `${process.env.API_HOST}/api/customer/activate/${customer.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: customer.email,
      subject: 'Welcome to CleaningService App! Confirm your Email.',
      template: './confirmation',
      context: {
        name: customer.first_name,
        url,
      },
    });
  }

  async sendAdminConfirmation(admin: Admin): Promise<void> {
    const url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Welcome to CleaningService App! Confirm your Email.',
      template: './confirmation',
      context: {
        name: admin.full_name,
        url,
      },
    });
  }

  async sendEmployeeConfirmation(employee: Employee): Promise<void> {
    const url = `${process.env.API_HOST}/api/employee/activate/${employee.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: employee.email,
      subject:
        'Welcome to CleaningService App! Confirm your Email.',
      template: './confirmation',
      context: {
        name: employee.first_name,
        url,
      },
    });
  }
}
