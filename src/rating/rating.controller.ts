import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Rating')
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @ApiOperation({ summary: 'Create rating' })
  @Post('create')
  async createRating(@Body() createRatingDto: CreateRatingDto) {
    const rating = this.ratingService.createRating(createRatingDto);
    return rating;
  }

  @ApiOperation({ summary: "Get all ratings" })
  @Get('all')
  async getAllRating() {
    return this.ratingService.getAllRating();
  }

  @ApiOperation({ summary: "Get rating by id" })
  @Get(':id')
  async getRatingById(@Param('id') id: string) {
    return this.ratingService.getRatingById(+id);
  }

  @ApiOperation({ summary: "Delete rating" })
  @Delete(':id')
  async deleteRatingById(@Param('id') id: string) {
    return this.ratingService.deleteRatingById(+id);
  }

  @ApiOperation({ summary: "Update rating" })
  @Put(':id')
  async updateRating(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    return this.ratingService.updateRating(+id, updateRatingDto);
  }
}
