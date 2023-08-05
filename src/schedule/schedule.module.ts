import { Module } from '@nestjs/common';
import { BuilderController } from './schedule.controller';
import { BuilderService } from './schedule.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Builder } from './models/schedule.model';

@Module({
  imports: [SequelizeModule.forFeature([Builder])],
  controllers: [BuilderController],
  providers: [BuilderService],
})
export class BuilderModule {}
