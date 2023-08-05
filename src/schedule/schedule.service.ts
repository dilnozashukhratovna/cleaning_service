import { Injectable } from '@nestjs/common';
import { Schedule } from './models/schedule.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(@InjectModel(Schedule) private scheduleRepo: typeof Schedule) {}

  async createSchedule(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const schedule = await this.scheduleRepo.create(createScheduleDto);
    return schedule;
  }

  async getAllSchedule(): Promise<Schedule[]> {
    const schedules = await this.scheduleRepo.findAll({ include: { all: true } });
    return schedules;
  }

  async getScheduleById(id: number): Promise<Schedule> {
    const schedule = await this.scheduleRepo.findByPk(id);
    return schedule;
  }

  async deleteScheduleById(id: number) {
    const schedule = await this.scheduleRepo.destroy({ where: { id } });
    return schedule;
  }

  async updateSchedule(id: number, updateScheduleDto: UpdateScheduleDto) {
    const schedule = await this.scheduleRepo.update(updateScheduleDto, {
      where: { id },
      returning: true,
    });

    return schedule[1][0].dataValues;
  }
}
