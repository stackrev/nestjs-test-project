import { Module } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { PrismaService } from '@app/shared';

@Module({
  providers: [FeedsService, PrismaService],
  controllers: [FeedsController],
})
export class FeedsModule {}
