import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BuilderService } from './customer.service';
import { CreateBuilderDto } from './dto/create-customer.dto';
import { UpdateBuilderDto } from './dto/update-customer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Builder')
@Controller('builder')
export class BuilderController {
  constructor(private readonly builderService: BuilderService) {}

  @ApiOperation({ summary: 'Builder  yaratish' })
  @Post('create')
  async createBuilder(@Body() createBuilderDto: CreateBuilderDto) {
    const builder = this.builderService.createBuilder(createBuilderDto);
    return builder;
  }

  @ApiOperation({ summary: "Builder'lani  ko'rish" })
  @Get('all')
  async getAllBuilder() {
    return this.builderService.getAllBuilder();
  }

  @ApiOperation({ summary: "Builder'ni id bo'yicha ko'rish" })
  @Get(':id')
  async getBuilderById(@Param('id') id: string) {
    return this.builderService.getBuilderById(+id);
  }

  @ApiOperation({ summary: "Builder'ni o'chirish" })
  @Delete(':id')
  async deleteBuilderById(@Param('id') id: string) {
    return this.builderService.deleteBuilderById(+id);
  }

  @ApiOperation({ summary: "Builder'ni yangilash" })
  @Put(':id')
  async updateBuilder(
    @Param('id') id: string,
    @Body() updateBuilderDto: UpdateBuilderDto,
  ) {
    return this.builderService.updateBuilder(+id, updateBuilderDto);
  }
}
