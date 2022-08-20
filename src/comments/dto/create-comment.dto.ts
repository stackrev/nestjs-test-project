import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @MaxLength(500)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  text: string;
}
