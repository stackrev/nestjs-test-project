import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @Get('/:feedId/feed')
  @ApiOperation({ summary: 'Get list of feed comments data' })
  async list(@Param('feedId') feedId: string) {
    return {
      comments: await this.service.list(feedId),
    };
  }

  @Post('/:feedId/feed')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create comment Api summary' })
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Param('feedId') feedId: string,
    @Body() dto: CreateCommentDto,
    @Request() req,
  ) {
    return {
      comment: await this.service.create(feedId, dto, req.user),
    };
  }

  @Put('/:commentId/update')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update comment Api summary' })
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('commentId') commentId: string,
    @Body() dto: UpdateCommentDto,
    @Request() req,
  ) {
    await this.service.update(commentId, dto, req.user);
  }

  @Delete('/:commentId/delete')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete comment Api summary' })
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('commentId') commentId: string, @Request() req) {
    await this.service.delete(commentId, req.user);
  }
}
