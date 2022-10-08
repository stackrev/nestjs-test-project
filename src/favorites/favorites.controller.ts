import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FavoritesService } from './favorites.service';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly service: FavoritesService) {}

  @Get('/')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'list favorites api' })
  @UseGuards(AuthGuard('jwt'))
  async list(@Request() req) {
    return {
      favorites: await this.service.list(req.user.id),
    };
  }

  @Post('/:feedId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'add favorite api' })
  @UseGuards(AuthGuard('jwt'))
  async add(@Param('feedId') feedId: string, @Request() req) {
    return {
      favorite: await this.service.add(req.user.id, Number(feedId)),
    };
  }

  @Delete('/:feedId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'remove favorite api' })
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('feedId') feedId: string, @Request() req) {
    await this.service.remove(req.user.id, Number(feedId));
  }
}
