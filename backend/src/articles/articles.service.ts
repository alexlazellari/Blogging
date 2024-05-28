import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateArticleDto,
  IArticleFindAllResponse,
  UpdateArticleDto,
} from './dto/articles.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  create(userId: number, createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articlesRepository.save({
      userId,
      ...createArticleDto,
    });
  }

  async findAll(userId: number): Promise<IArticleFindAllResponse[]> {
    const articles = await this.articlesRepository
      .createQueryBuilder('article')
      .leftJoin('article.user', 'user')
      .leftJoin('article.likes', 'likes')
      .loadRelationCountAndMap('article.totalLikes', 'article.likes')
      .loadRelationCountAndMap(
        'article.isLikedByUser',
        'article.likes',
        'like',
        (qb) => qb.where('like.userId = :userId', { userId }),
      )
      .orderBy('article.created', 'DESC')
      .getMany();

    return articles as unknown as IArticleFindAllResponse[];
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.articlesRepository.update(id, updateArticleDto);
  }

  remove(id: number) {
    return this.articlesRepository.delete(id);
  }
}
