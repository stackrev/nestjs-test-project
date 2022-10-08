import { ApiProperty } from '@nestjs/swagger';

export class LikeEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  feed_id: number;
}
