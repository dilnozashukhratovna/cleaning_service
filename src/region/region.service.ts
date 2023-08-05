import { Injectable } from '@nestjs/common';
import { Region } from './models/region.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private regionRepo: typeof Region) {}

  async createRegion(createRegionDto: CreateRegionDto): Promise<Region> {
    const region = await this.regionRepo.create(createRegionDto);
    return region;
  }

  async getAllRegion(): Promise<Region[]> {
    const regions = await this.regionRepo.findAll({ include: { all: true } });
    return regions;
  }

  async getRegionById(id: number): Promise<Region> {
    const region = await this.regionRepo.findByPk(id);
    return region;
  }

  async deleteRegionById(id: number) {
    const region = await this.regionRepo.destroy({ where: { id } });
    return region;
  }

  async updateRegion(id: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.regionRepo.update(updateRegionDto, {
      where: { id },
      returning: true,
    });

    return region[1][0].dataValues;
  }
}
