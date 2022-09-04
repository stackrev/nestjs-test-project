import { PrismaService } from '@app/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getOneUser(id: number | string) {
    try {
      return await this.prisma.user.findFirst({
        where: { id: Number(id) },
      });
    } catch (error) {
      return 'Not found';
    }
  }
}
