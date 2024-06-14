import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/like.dto';
import { GetUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TAuthValidateResponse } from 'src/auth/dto/auth.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @GetUser() userInfo: TAuthValidateResponse,
    @Body() createLikeDto: CreateLikeDto,
  ) {
    return this.likesService.create(userInfo.id, createLikeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likesService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('article/:articleId')
  @HttpCode(204)
  removeLikeFromArticle(
    @GetUser() userInfo: TAuthValidateResponse,
    @Param('articleId') articleId: string,
  ) {
    return this.likesService.removeLikeByArticleId(userInfo.id, +articleId);
  }
}
