import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { District } from './district/models/district.model';
import { Region } from './region/models/region.model';
import { Service_type } from './service_type/models/service_type.model';
import { Payment } from './payment/models/payment.model';
import { Employee_service } from './employee_service/models/employee_service.model';
import { Rating } from './rating/models/rating.model';
import { Location } from './location/models/location.model';
import { Schedule } from './schedule/models/schedule.model';
import { Admin } from './admin/models/admin.model';
import { Customer } from './customer/models/customer.model';
import { Employee } from './employee/models/employee.model';
import { DistrictModule } from './district/district.module';
import { RegionModule } from './region/region.module';
import { Service_typeModule } from './service_type/service_type.module';
import { PaymentModule } from './payment/payment.module';
import { Employee_serviceModule } from './employee_service/employee_service.module';
import { RatingModule } from './rating/rating.module';
import { LocationModule } from './location/location.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        District,
        Region,
        Service_type,
        Payment,
        Employee_service,
        Rating,
        Location,
        Schedule,
        Admin,
        Customer,
        Employee,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    DistrictModule,
    RegionModule,
    Service_typeModule,
    PaymentModule,
    Employee_serviceModule,
    RatingModule,
    LocationModule,
    ScheduleModule,
    AdminModule,
    CustomerModule,
    EmployeeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
