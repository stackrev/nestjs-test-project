import { PrismaService } from '@app/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: number) {
    return await this.prisma.favorite.findMany({
      where: { user_id: userId },
      include: {
        feed: {
          select: {
            id: true,
            user_id: true,
            title: true,
            description: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    });
  }

  async add(userId: number, feedId: number) {
    const favorite = await this.prisma.favorite.findFirst({
      where: { user_id: userId, feed_id: feedId },
    });

    if (!favorite) {
      return await this.prisma.favorite.create({
        data: {
          user_id: userId,
          feed_id: feedId,
        },
      });
    }

    return favorite;
  }

  async remove(userId: number, feedId: number) {
    return await this.prisma.favorite.deleteMany({
      where: { user_id: userId, feed_id: feedId },
    });
  }
}
