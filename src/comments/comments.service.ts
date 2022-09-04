import { PrismaService } from '@app/shared';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(feedId: string) {
    return await this.prisma.comment.findMany({
      where: {
        feed_id: Number(feedId),
      },
    });
  }

  async create(feedId: string, dto: CreateCommentDto, user: any) {
    const feed = await this.findOrThrowException(feedId);

    return await this.prisma.comment.create({
      data: {
        user_id: user.id,
        feed_id: feed.id,
        text: dto.text,
        is_confirmed: false,
      },
    });
  }

  async update(commentId: string, dto: UpdateCommentDto, user: any) {
    const comment = await this.prisma.comment.findFirst({
      where: { id: Number(commentId) },
    });

    if (!comment || comment.user_id !== user.id) {
      throw new NotFoundException();
    }

    return await this.prisma.comment.update({
      where: { id: comment.id },
      data: {
        text: dto.text,
      },
    });
  }

  async delete(commentId: string, user: any) {
    const comment = await this.prisma.comment.findFirst({
      where: { id: Number(commentId) },
    });

    if (!comment || comment.user_id !== user.id) {
      throw new NotFoundException();
    }

    return await this.prisma.comment.delete({ where: { id: comment.id } });
  }

  async findOrThrowException(feedId: string) {
    const feed = await this.prisma.feed.findFirst({
      where: { id: Number(feedId) },
    });

    if (!feed) {
      throw new NotFoundException();
    }

    return feed;
  }
}
