// articles.dtos.ts

import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}

export interface IArticleFindAllResponse {
  id: number;
  title: string;
  content: string;
  created: Date;
  userId: number;
  totalLikes: number;
  isLikedByUser: number;
}
