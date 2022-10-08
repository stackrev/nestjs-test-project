import { PrismaService } from '@app/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}

  async like(userId: number, feedId: number) {
    const like = await this.prisma.like.findFirst({
      where: { user_id: userId, feed_id: feedId },
    });

    if (!like) {
      return await this.prisma.like.create({
        data: {
          user_id: userId,
          feed_id: feedId,
        },
      });
    }

    return like;
  }

  async unlike(userId: number, feedId: number) {
    return await this.prisma.like.deleteMany({
      where: { user_id: userId, feed_id: feedId },
    });
  }
}
