import { Module } from '@nestjs/common';
import { BuilderController } from './payment.controller';
import { BuilderService } from './payment.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Builder } from './models/payment.model';

@Module({
  imports: [SequelizeModule.forFeature([Builder])],
  controllers: [BuilderController],
  providers: [BuilderService],
})
export class BuilderModule {}
