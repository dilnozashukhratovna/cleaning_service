import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @ApiOperation({ summary: 'Create schedule' })
  @Post('create')
  async createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    const schedule = this.scheduleService.createSchedule(createScheduleDto);
    return schedule;
  }

  @ApiOperation({ summary: "Get all schedules" })
  @Get('all')
  async getAllSchedule() {
    return this.scheduleService.getAllSchedule();
  }

  @ApiOperation({ summary: "Get schedule by id" })
  @Get(':id')
  async getScheduleById(@Param('id') id: string) {
    return this.scheduleService.getScheduleById(+id);
  }

  @ApiOperation({ summary: "Delete schedule" })
  @Delete(':id')
  async deleteScheduleById(@Param('id') id: string) {
    return this.scheduleService.deleteScheduleById(+id);
  }

  @ApiOperation({ summary: "Update schedule by id" })
  @Put(':id')
  async updateSchedule(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.updateSchedule(+id, updateScheduleDto);
  }
}
