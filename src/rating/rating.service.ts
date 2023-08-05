import { Injectable } from '@nestjs/common';
import { Rating } from './models/rating.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingService {
  constructor(@InjectModel(Rating) private ratingRepo: typeof Rating) {}

  async createRating(createRatingDto: CreateRatingDto): Promise<Rating> {
    const rating = await this.ratingRepo.create(createRatingDto);
    return rating;
  }

  async getAllRating(): Promise<Rating[]> {
    const ratings = await this.ratingRepo.findAll({ include: { all: true } });
    return ratings;
  }

  async getRatingById(id: number): Promise<Rating> {
    const rating = await this.ratingRepo.findByPk(id);
    return rating;
  }

  async deleteRatingById(id: number) {
    const rating = await this.ratingRepo.destroy({ where: { id } });
    return rating;
  }

  async updateRating(id: number, updateRatingDto: UpdateRatingDto) {
    const rating = await this.ratingRepo.update(updateRatingDto, {
      where: { id },
      returning: true,
    });

    return rating[1][0].dataValues;
  }
}
