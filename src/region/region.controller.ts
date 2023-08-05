import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: 'Region  yaratish' })
  @Post('create')
  async createRegion(@Body() createRegionDto: CreateRegionDto) {
    const region = this.regionService.createRegion(createRegionDto);
    return region;
  }

  @ApiOperation({ summary: "Region'lani  ko'rish" })
  @Get('all')
  async getAllRegion() {
    return this.regionService.getAllRegion();
  }

  @ApiOperation({ summary: "Region'ni id bo'yicha ko'rish" })
  @Get(':id')
  async getRegionById(@Param('id') id: string) {
    return this.regionService.getRegionById(+id);
  }

  @ApiOperation({ summary: "Region'ni o'chirish" })
  @Delete(':id')
  async deleteRegionById(@Param('id') id: string) {
    return this.regionService.deleteRegionById(+id);
  }

  @ApiOperation({ summary: "Region'ni yangilash" })
  @Put(':id')
  async updateRegion(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateRegionDto,
  ) {
    return this.regionService.updateRegion(+id, updateRegionDto);
  }
}
