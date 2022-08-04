import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

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
