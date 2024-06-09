import { Injectable } from '@nestjs/common';
import {
  CreateCommentDto,
  FindAllDto,
  UpdateCommentDto,
} from './dto/comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

const COMMENTS_PER_PAGE = 5;

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  create(userId: number, createCommentDto: CreateCommentDto) {
    return this.commentsRepository.save({
      userId,
      ...createCommentDto,
    });
  }

  findAll(findAllDto: FindAllDto): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: {
        articleId: findAllDto.articleId,
      },
      relations: ['user'],
      skip: findAllDto.offset,
      take: COMMENTS_PER_PAGE,
      order: {
        created: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return this.commentsRepository.delete(id);
  }
}
