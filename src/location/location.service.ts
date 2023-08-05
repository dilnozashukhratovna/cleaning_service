import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './models/location.model';

@Injectable()
export class LocationService {
  constructor(@InjectModel(Location) private locationRepo: typeof Location) {}

  async createLocation(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = await this.locationRepo.create(createLocationDto);
    return location;
  }

  async getAllLocation(): Promise<Location[]> {
    const locations = await this.locationRepo.findAll({ include: { all: true } });
    return locations;
  }

  async getLocationById(id: number): Promise<Location> {
    const location = await this.locationRepo.findByPk(id);
    return location;
  }

  async deleteLocationById(id: number) {
    const location = await this.locationRepo.destroy({ where: { id } });
    return location;
  }

  async updateLocation(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.locationRepo.update(updateLocationDto, {
      where: { id },
      returning: true,
    });

    return location[1][0].dataValues;
  }
}
