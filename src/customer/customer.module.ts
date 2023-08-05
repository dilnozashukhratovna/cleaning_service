import { Module } from '@nestjs/common';
import { BuilderController } from './customer.controller';
import { BuilderService } from './customer.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Builder } from './models/customer.model';

@Module({
  imports: [SequelizeModule.forFeature([Builder])],
  controllers: [BuilderController],
  providers: [BuilderService],
})
export class BuilderModule {}
