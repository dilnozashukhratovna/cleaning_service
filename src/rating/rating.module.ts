import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rating } from './models/rating.model';

@Module({
  imports: [SequelizeModule.forFeature([Rating])],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
