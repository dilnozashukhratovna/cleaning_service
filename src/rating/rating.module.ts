import { Module } from '@nestjs/common';
import { BuilderController } from './rating.controller';
import { BuilderService } from './rating.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Builder } from './models/rating.model';

@Module({
  imports: [SequelizeModule.forFeature([Builder])],
  controllers: [BuilderController],
  providers: [BuilderService],
})
export class BuilderModule {}
