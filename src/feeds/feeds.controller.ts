import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { FeedsService } from './feeds.service';

@Controller('feeds')
export class FeedsController {
  constructor(private readonly service: FeedsService) {}

  @Get('/')
  async list(@Query('take') take: string, @Query('skip') skip: string) {
    return {
      feeds: await this.service.list(take || '15', skip || '0'),
    };
  }

  @Get('/:id')
  async show(@Param('id') id: string) {
    return {
      feed: await this.service.show(id),
    };
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto: CreateFeedDto, @Request() req) {
    return {
      feed: await this.service.create(dto, req.user),
    };
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateFeedDto,
    @Request() req,
  ) {
    await this.service.update(id, dto, req.user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string, @Request() req) {
    await this.service.delete(id, req.user);
  }
}
