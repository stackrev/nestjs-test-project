import {
  Controller,
  Param,
  Post,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { LikeResponse } from './responses';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly service: LikesService) {}

  @Post('/:feedId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'like action api' })
  @ApiResponse({ status: 201, type: LikeResponse })
  @UseGuards(AuthGuard('jwt'))
  async like(@Param('feedId') feedId: string, @Request() req) {
    return {
      like: await this.service.like(Number(req.user.id), Number(feedId)),
    };
  }

  @Delete('/:feedId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'unlike action api' })
  @UseGuards(AuthGuard('jwt'))
  async unlike(@Param('feedId') feedId: string, @Request() req) {
    await this.service.unlike(Number(req.user.id), Number(feedId));
  }
}
