import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './models/employee.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Employee]),
    JwtModule.register({global:true}),
    MailModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, MailService],
})
export class EmployeeModule {}
