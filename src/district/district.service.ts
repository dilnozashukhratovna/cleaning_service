import { Injectable } from '@nestjs/common';
import { District } from './models/district.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private districtRepo: typeof District) {}

  async createDistrict(createDistrictDto: CreateDistrictDto): Promise<District> {
    const district = await this.districtRepo.create(createDistrictDto);
    return district;
  }

  async getAllDistrict(): Promise<District[]> {
    const districts = await this.districtRepo.findAll({ include: { all: true } });
    return districts;
  }

  async getDistrictById(id: number): Promise<District> {
    const district = await this.districtRepo.findByPk(id);
    return district;
  }

  async deleteDistrictById(id: number) {
    const district = await this.districtRepo.destroy({ where: { id } });
    return district;
  }

  async updateDistrict(id: number, updateDistrictDto: UpdateDistrictDto) {
    const district = await this.districtRepo.update(updateDistrictDto, {
      where: { id },
      returning: true,
    });

    return district[1][0].dataValues;
  }
}
