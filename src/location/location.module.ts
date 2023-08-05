import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Location } from './models/location.model';

@Module({
  imports: [SequelizeModule.forFeature([Location])],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
