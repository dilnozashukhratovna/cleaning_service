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
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: 'Create region' })
  // @UseGuards(AdminGuard)
  @Post('create')
  async createRegion(@Body() createRegionDto: CreateRegionDto) {
    const region = this.regionService.createRegion(createRegionDto);
    return region;
  }

  @ApiOperation({ summary: 'Get all regions' })
  // @UseGuards(AdminGuard)
  @Get('all')
  async getAllRegion() {
    return this.regionService.getAllRegion();
  }

  @ApiOperation({ summary: 'Get region by id' })
  @UseGuards(AdminGuard)
  @Get(':id')
  async getRegionById(@Param('id') id: string) {
    return this.regionService.getRegionById(+id);
  }

  @ApiOperation({ summary: 'Delete region' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteRegionById(@Param('id') id: string) {
    return this.regionService.deleteRegionById(+id);
  }

  @ApiOperation({ summary: 'Update region' })
  // @UseGuards(AdminGuard)
  @Put(':id')
  async updateRegion(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateRegionDto,
  ) {
    return this.regionService.updateRegion(+id, updateRegionDto);
  }
}
