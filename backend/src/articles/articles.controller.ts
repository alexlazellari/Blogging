import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/auth.decorator';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @GetUser() userInfo: { username: string; id: number },
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return this.articlesService.create(userInfo.id, createArticleDto);
  }

  @Get()
  async findAll() {
    const articles = await this.articlesService.findAll();
    return {
      status: 'success',
      totalResults: articles.length,
      articles,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.articlesService.remove(+id);
    return {
      status: 'ok',
      message: `Article with id ${id} has been deleted`,
    };
  }
}
