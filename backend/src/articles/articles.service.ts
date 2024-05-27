import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

  async findAll(userId: number): Promise<Article[]> {
    const articles = await this.articlesRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user')
      .leftJoin('article.likes', 'likes')
      .loadRelationCountAndMap('article.likesCount', 'article.likes')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(1) > 0', 'userLiked')
          .from('Like', 'like')
          .where('like.articleId = article.id')
          .andWhere('like.userId = :userId', { userId });
      }, 'userLiked')
      .getMany();

    return articles;
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
