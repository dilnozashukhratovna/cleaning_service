import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Schedule } from './models/schedule.model';

@Module({
  imports: [SequelizeModule.forFeature([Schedule])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
