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

export type TArticleFindAllResponse = {
  id: number;
  title: string;
  content: string;
  created: Date;
  userId: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
  totalLikes: number;
  totalComments: number;
  isLikedByUser: number;
};
