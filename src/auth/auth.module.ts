import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: '7c0mHxAypMcTWQ25m_UP9RHrUmlCgd3ChREmd',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, PrismaService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
