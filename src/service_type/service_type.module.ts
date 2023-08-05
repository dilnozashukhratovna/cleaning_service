import { Module } from '@nestjs/common';
import { Service_typeController } from './service_type.controller';
import { Service_typeService } from './service_type.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service_type } from './models/service_type.model';

@Module({
  imports: [SequelizeModule.forFeature([Service_type])],
  controllers: [Service_typeController],
  providers: [Service_typeService],
})
export class Service_typeModule {}
