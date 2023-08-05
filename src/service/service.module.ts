import { Module } from '@nestjs/common';
import { BuilderController } from './service.controller';
import { BuilderService } from './service.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Builder } from './models/service.model';

@Module({
  imports: [SequelizeModule.forFeature([Builder])],
  controllers: [BuilderController],
  providers: [BuilderService],
})
export class BuilderModule {}
