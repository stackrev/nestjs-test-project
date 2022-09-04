import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@app/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        return user;
      }
    }

    return undefined;
  }

  async validatePayload(payload: any) {
    if (payload && payload.sub) {
      const user = await this.prisma.user.findFirst({
        where: { id: Number(payload.sub) },
      });

      return user;
    }

    return undefined;
  }

  async login(user: any) {
    const payload = { sub: user.id };
    return {
      access_token: await this.jwt.sign(payload),
    };
  }

  async register(dto: RegisterDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });

    // if user exist
    if (user) {
      throw new UnprocessableEntityException();
    }

    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(dto.password, saltOrRounds);

    // if user not exist
    const newUser = await this.prisma.user.create({
      data: {
        first_name: dto.first_name,
        last_name: dto.last_name,
        email: dto.email,
        password: hashPassword,
      },
    });

    return newUser.id;
  }
}
