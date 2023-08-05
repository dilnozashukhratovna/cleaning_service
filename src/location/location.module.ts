import { Module } from '@nestjs/common';
import { BuilderController } from './location.controller';
import { BuilderService } from './location.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Builder } from './models/builder.location';

@Module({
  imports: [SequelizeModule.forFeature([Builder])],
  controllers: [BuilderController],
  providers: [BuilderService],
})
export class BuilderModule {}
