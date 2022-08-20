import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

@Module({
  providers: [CommentsService, PrismaService],
  controllers: [CommentsController],
})
export class CommentsModule {}
