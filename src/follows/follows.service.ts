import { PrismaService } from '@app/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FollowsService {
  constructor(private readonly prisma: PrismaService) {}

  async countFollows(userId: number, type = 'follower') {
    let where;

    if (type === 'following') {
      where = {
        follower_id: userId,
      };
    } else {
      where = {
        following_id: userId,
      };
    }

    return await this.prisma.follow.count({ where });
  }

  async listFollows(userId: number, type = 'follower') {
    let where;
    let include;

    if (type === 'following') {
      where = {
        follower_id: userId,
      };
      include = {
        following: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      };
    } else {
      where = {
        following_id: userId,
      };
      include = {
        follower: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      };
    }

    return await this.prisma.follow.findMany({
      where,
      include,
    });
  }

  async follow(followerId: number, followingId: number) {
    const follow = await this.prisma.follow.findFirst({
      where: {
        follower_id: followerId,
        following_id: followingId,
      },
    });

    if (!follow) {
      return await this.prisma.follow.create({
        data: {
          follower_id: followerId,
          following_id: followingId,
        },
      });
    }

    return follow;
  }

  async unFollow(followerId: number, followingId: number) {
    return await this.prisma.follow.deleteMany({
      where: {
        follower_id: followerId,
        following_id: followingId,
      },
    });
  }
}
