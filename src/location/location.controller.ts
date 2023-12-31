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
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({ summary: 'Create location' })
  @UseGuards(AdminGuard)
  @Post('create')
  async createLocation(@Body() createLocationDto: CreateLocationDto) {
    const location = this.locationService.createLocation(createLocationDto);
    return location;
  }

  @ApiOperation({ summary: 'Get all locations' })
  @UseGuards(AdminGuard)
  @Get('all')
  async getAllLocation() {
    return this.locationService.getAllLocation();
  }

  @ApiOperation({ summary: 'Get location by id' })
  @UseGuards(AdminGuard)
  @Get(':id')
  async getLocationById(@Param('id') id: string) {
    return this.locationService.getLocationById(+id);
  }

  @ApiOperation({ summary: 'Delete location' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteLocationById(@Param('id') id: string) {
    return this.locationService.deleteLocationById(+id);
  }

  @ApiOperation({ summary: 'Update location' })
  @UseGuards(AdminGuard)
  @Put(':id')
  async updateLocation(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.updateLocation(+id, updateLocationDto);
  }
}
