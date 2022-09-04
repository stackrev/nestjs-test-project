import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from '@app/shared';

@Module({
  providers: [CommentsService, PrismaService],
  controllers: [CommentsController],
})
export class CommentsModule {}
