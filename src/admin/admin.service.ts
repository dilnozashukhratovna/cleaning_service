import { Injectable } from '@nestjs/common';
import { Admin } from './models/admin.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminRepo: typeof Admin) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = await this.adminRepo.create(createAdminDto);
    return admin;
  }

  async getAllAdmin(): Promise<Admin[]> {
    const admins = await this.adminRepo.findAll({ include: { all: true } });
    return admins;
  }

  async getAdminById(id: number): Promise<Admin> {
    const admin = await this.adminRepo.findByPk(id);
    return admin;
  }

  async deleteAdminById(id: number) {
    const admin = await this.adminRepo.destroy({ where: { id } });
    return admin;
  }

  async updateAdmin(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepo.update(updateAdminDto, {
      where: { id },
      returning: true,
    });

    return admin[1][0].dataValues;
  }
}
