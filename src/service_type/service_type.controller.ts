import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Service_typeService } from './service_type.service';
import { CreateService_typeDto } from './dto/create-service_type.dto';
import { UpdateService_typeDto } from './dto/update-service_type.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Service_type')
@Controller('service_type')
export class Service_typeController {
  constructor(private readonly service_typeService: Service_typeService) {}

  @ApiOperation({ summary: 'Create service type' })
  @Post('create')
  async createService_type(@Body() createService_typeDto: CreateService_typeDto) {
    const service_type = this.service_typeService.createService_type(createService_typeDto);
    return service_type;
  }

  @ApiOperation({ summary: "Get all service types" })
  @Get('all')
  async getAllService_type() {
    return this.service_typeService.getAllService_type();
  }

  @ApiOperation({ summary: "Get service type by id" })
  @Get(':id')
  async getService_typeById(@Param('id') id: string) {
    return this.service_typeService.getService_typeById(+id);
  }

  @ApiOperation({ summary: "Delete service type" })
  @Delete(':id')
  async deleteService_typeById(@Param('id') id: string) {
    return this.service_typeService.deleteService_typeById(+id);
  }

  @ApiOperation({ summary: "Update service type" })
  @Put(':id')
  async updateService_type(
    @Param('id') id: string,
    @Body() updateService_typeDto: UpdateService_typeDto,
  ) {
    return this.service_typeService.updateService_type(+id, updateService_typeDto);
  }
}
