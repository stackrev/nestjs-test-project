import { LikeEntity } from '@app/shared';
import { ApiProperty } from '@nestjs/swagger';
import { Like } from '@prisma/client';

export class LikeResponse {
  @ApiProperty({ type: () => LikeEntity })
  like: Like;
}
