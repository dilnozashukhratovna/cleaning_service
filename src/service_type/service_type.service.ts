import { Injectable } from '@nestjs/common';
import { Service_type } from './models/service_type.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateService_typeDto } from './dto/create-service_type.dto';
import { UpdateService_typeDto } from './dto/update-service_type.dto';

@Injectable()
export class Service_typeService {
  constructor(@InjectModel(Service_type) private service_typeRepo: typeof Service_type) {}

  async createService_type(createService_typeDto: CreateService_typeDto): Promise<Service_type> {
    const service_type = await this.service_typeRepo.create(createService_typeDto);
    return service_type;
  }

  async getAllService_type(): Promise<Service_type[]> {
    const service_types = await this.service_typeRepo.findAll({ include: { all: true } });
    return service_types;
  }

  async getService_typeById(id: number): Promise<Service_type> {
    const service_type = await this.service_typeRepo.findByPk(id);
    return service_type;
  }

  async deleteService_typeById(id: number) {
    const service_type = await this.service_typeRepo.destroy({ where: { id } });
    return service_type;
  }

  async updateService_type(id: number, updateService_typeDto: UpdateService_typeDto) {
    const service_type = await this.service_typeRepo.update(updateService_typeDto, {
      where: { id },
      returning: true,
    });

    return service_type[1][0].dataValues;
  }
}
