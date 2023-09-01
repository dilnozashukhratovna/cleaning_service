import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('District')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: 'Create district' })
  // @UseGuards(AdminGuard)
  @Post('create')
  async createDistrict(@Body() createDistrictDto: CreateDistrictDto) {
    const district = this.districtService.createDistrict(createDistrictDto);
    return district;
  }

  @ApiOperation({ summary: 'Get all districts' })
  @UseGuards(AdminGuard)
  @Get('all')
  async getAllDistrict() {
    return this.districtService.getAllDistrict();
  }

  @ApiOperation({ summary: 'Get district by id' })
  @UseGuards(AdminGuard)
  @Get(':id')
  async getDistrictById(@Param('id') id: string) {
    return this.districtService.getDistrictById(+id);
  }

  @ApiOperation({ summary: 'Delete district' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteDistrictById(@Param('id') id: string) {
    return this.districtService.deleteDistrictById(+id);
  }

  @ApiOperation({ summary: 'Update district' })
  @UseGuards(AdminGuard)
  @Put(':id')
  async updateDistrict(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.updateDistrict(+id, updateDistrictDto);
  }
}
