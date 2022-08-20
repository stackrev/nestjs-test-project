import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFeedDto {
  @MaxLength(250)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(5000)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  description: string;
}
