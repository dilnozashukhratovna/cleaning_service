import { Injectable } from '@nestjs/common';
import { Builder } from './models/customer.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBuilderDto } from './dto/create-customer.dto';
import { UpdateBuilderDto } from './dto/update-customer.dto';

@Injectable()
export class BuilderService {
  constructor(@InjectModel(Builder) private builderRepo: typeof Builder) {}

  async createBuilder(createBuilderDto: CreateBuilderDto): Promise<Builder> {
    const builder = await this.builderRepo.create(createBuilderDto);
    return builder;
  }

  async getAllBuilder(): Promise<Builder[]> {
    const builders = await this.builderRepo.findAll({ include: { all: true } });
    return builders;
  }

  async getBuilderById(id: number): Promise<Builder> {
    const builder = await this.builderRepo.findByPk(id);
    return builder;
  }

  async deleteBuilderById(id: number) {
    const builder = await this.builderRepo.destroy({ where: { id } });
    return builder;
  }

  async updateBuilder(id: number, updateBuilderDto: UpdateBuilderDto) {
    const builder = await this.builderRepo.update(updateBuilderDto, {
      where: { id },
      returning: true,
    });

    return builder[1][0].dataValues;
  }
}
