import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';

export class CreateCommentDto {
  @IsNotEmpty()
  articleId: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}

export class FindAllDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  articleId: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  offset: number;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
