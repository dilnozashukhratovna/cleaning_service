import { Module } from '@nestjs/common';
import { BuilderController } from './admin.controller';
import { BuilderService } from './admin.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Builder } from './models/admin.model';

@Module({
  imports: [SequelizeModule.forFeature([Builder])],
  controllers: [BuilderController],
  providers: [BuilderService],
})
export class BuilderModule {}
