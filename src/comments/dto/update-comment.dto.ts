import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCommentDto {
  @MaxLength(500)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  text: string;
}
