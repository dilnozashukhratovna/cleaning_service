import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('District')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: 'District  yaratish' })
  @Post('create')
  async createDistrict(@Body() createDistrictDto: CreateDistrictDto) {
    const district = this.districtService.createDistrict(createDistrictDto);
    return district;
  }

  @ApiOperation({ summary: "District'lani  ko'rish" })
  @Get('all')
  async getAllDistrict() {
    return this.districtService.getAllDistrict();
  }

  @ApiOperation({ summary: "District'ni id bo'yicha ko'rish" })
  @Get(':id')
  async getDistrictById(@Param('id') id: string) {
    return this.districtService.getDistrictById(+id);
  }

  @ApiOperation({ summary: "District'ni o'chirish" })
  @Delete(':id')
  async deleteDistrictById(@Param('id') id: string) {
    return this.districtService.deleteDistrictById(+id);
  }

  @ApiOperation({ summary: "District'ni yangilash" })
  @Put(':id')
  async updateDistrict(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.updateDistrict(+id, updateDistrictDto);
  }
}
