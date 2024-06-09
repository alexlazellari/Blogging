import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateLikeDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  articleId: number;
}
