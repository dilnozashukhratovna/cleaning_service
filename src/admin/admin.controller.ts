import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Create admin' })
  @Post('create')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    const admin = this.adminService.createAdmin(createAdminDto);
    return admin;
  }

  @ApiOperation({ summary: 'Get all admins' })
  @Get('all')
  async getAllAdmin() {
    return this.adminService.getAllAdmin();
  }

  @ApiOperation({ summary: 'Get admin by id' })
  @Get(':id')
  async getAdminById(@Param('id') id: string) {
    return this.adminService.getAdminById(+id);
  }

  @ApiOperation({ summary: "Delete admin" })
  @Delete(':id')
  async deleteAdminById(@Param('id') id: string) {
    return this.adminService.deleteAdminById(+id);
  }

  @ApiOperation({ summary: "Update admin" })
  @Put(':id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.updateAdmin(+id, updateAdminDto);
  }
}
