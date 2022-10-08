import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FollowsService } from './follows.service';

@ApiTags('Follows')
@Controller('follows')
export class FollowsController {
  constructor(private readonly service: FollowsService) {}

  @Get('/:userId/count/:type')
  @ApiOperation({ summary: 'get followers or followings count' })
  async countFollows(
    @Param('userId') userId: string,
    @Param('type') type: string,
  ) {
    return {
      count: await this.service.countFollows(Number(userId), type),
    };
  }

  @Get('/:userId/list/:type')
  @ApiOperation({ summary: 'get followers or followings list' })
  async listFollows(
    @Param('userId') userId: string,
    @Param('type') type: string,
  ) {
    return {
      follows: await this.service.listFollows(Number(userId), type),
    };
  }

  @Post('/:userId/follow')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'follow action api' })
  @UseGuards(AuthGuard('jwt'))
  async follow(@Param('userId') userId: string, @Request() req) {
    return {
      follow: await this.service.follow(req.user.id, Number(userId)),
    };
  }

  @Post('/:userId/un-follow')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'un-follow action api' })
  @UseGuards(AuthGuard('jwt'))
  async unFollow(@Param('userId') userId: string, @Request() req) {
    await this.service.unFollow(req.user.id, Number(userId));
  }
}
