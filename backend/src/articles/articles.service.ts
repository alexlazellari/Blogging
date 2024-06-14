import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateArticleDto,
  TArticleFindAllResponse,
  TArticleFindOneResponse,
  UpdateArticleDto,
} from './dto/articles.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  async create(
    userId: number,
    createArticleDto: CreateArticleDto,
  ): Promise<TArticleFindOneResponse> {
    const article = await this.articlesRepository.save({
      userId,
      ...createArticleDto,
    });

    return this.findOne(userId, article.id);
  }

  async findAll(userId: number): Promise<TArticleFindAllResponse[]> {
    const articles = await this.articlesRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user')
      .leftJoin('article.likes', 'likes')
      .loadRelationCountAndMap('article.totalLikes', 'article.likes')
      .loadRelationCountAndMap('article.totalComments', 'article.comments')
      .loadRelationCountAndMap(
        'article.isLikedByUser',
        'article.likes',
        'like',
        (qb) => qb.where('like.userId = :userId', { userId }),
      )
      .orderBy('article.created', 'DESC')
      .getMany();

    return articles as unknown as TArticleFindAllResponse[];
  }

  async findOne(
    userId: number,
    articleId: number,
  ): Promise<TArticleFindOneResponse> {
    const article = await this.articlesRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user')
      .leftJoin('article.likes', 'likes')
      .loadRelationCountAndMap('article.totalLikes', 'article.likes')
      .loadRelationCountAndMap('article.totalComments', 'article.comments')
      .loadRelationCountAndMap(
        'article.isLikedByUser',
        'article.likes',
        'like',
        (qb) => qb.where('like.userId = :userId', { userId }),
      )
      .where('article.id = :articleId', { articleId }) // Filters to find one specific article
      .getOne(); // Retrieves only one result

    return article as unknown as TArticleFindOneResponse;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.articlesRepository.update(id, updateArticleDto);
  }

  remove(id: number) {
    return this.articlesRepository.delete(id);
  }
}
