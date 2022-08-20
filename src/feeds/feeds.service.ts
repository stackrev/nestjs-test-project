import { PrismaService } from 'src/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';

@Injectable()
export class FeedsService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return await this.prisma.feed.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        comments: {
          select: {
            id: true,
            text: true,
            created_at: true,
            updated_at: true,
            user: {
              select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
    });
  }

  async show(id: string) {
    return await this.prisma.feed.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  }

  async create(dto: CreateFeedDto, user: any) {
    return await this.prisma.feed.create({
      data: {
        user_id: user.id,
        title: dto.title,
        description: dto.description,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  }

  async update(id: string, dto: UpdateFeedDto, user: any) {
    const feed = await this.prisma.feed.findFirst({
      where: { id: Number(id) },
    });

    if (!feed || feed.user_id !== user.id) {
      throw new NotFoundException();
    }

    return await this.prisma.feed.update({
      where: { id: feed.id },
      data: {
        title: dto.title,
        description: dto.description,
      },
    });
  }

  async delete(id: string, user: any) {
    const feed = await this.prisma.feed.findFirst({
      where: { id: Number(id) },
    });

    if (!feed || feed.user_id !== user.id) {
      throw new NotFoundException();
    }

    return await this.prisma.feed.delete({ where: { id: Number(id) } });
  }
}
