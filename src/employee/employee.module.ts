import { Module } from '@nestjs/common';
import { BuilderController } from './employee.controller';
import { BuilderService } from './employee.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Builder } from './models/employee.model';

@Module({
  imports: [SequelizeModule.forFeature([Builder])],
  controllers: [BuilderController],
  providers: [BuilderService],
})
export class BuilderModule {}
