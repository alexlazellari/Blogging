import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}

  create(userId: number, createLikeDto: CreateLikeDto) {
    return this.likesRepository.save({
      userId,
      ...createLikeDto,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  remove(id: number) {
    return this.likesRepository.delete(id);
  }

  removeLikeByArticleId(userId: number, articleId: number) {
    return this.likesRepository.delete({ userId, articleId });
  }
}
