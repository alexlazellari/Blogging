import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/auth.decorator';
import {
  Action,
  CaslAbilityFactory,
} from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Article } from './entities/article.entity';
import {
  CreateArticleDto,
  TArticleFindOneResponse,
  UpdateArticleDto,
} from './dto/articles.dto';
import { TAuthValidateResponse } from 'src/auth/dto/auth.dto';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @GetUser() userInfo: TAuthValidateResponse,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<TArticleFindOneResponse> {
    return this.articlesService.create(userInfo.id, createArticleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @GetUser()
    { id }: TAuthValidateResponse,
  ) {
    const articles = await this.articlesService.findAll(id);
    return {
      status: 'success',
      totalResults: articles.length,
      articles,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@GetUser() userInfo: TAuthValidateResponse, @Param('id') id: string) {
    return this.articlesService.findOne(userInfo.id, +id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@GetUser() userInfo: TAuthValidateResponse, @Param('id') id: string) {
    const ability = this.caslAbilityFactory.createForUser(userInfo);

    if (ability.cannot(Action.Delete, Article)) {
      throw new ForbiddenException(
        'You have no permission to delete this article',
      );
    }
    this.articlesService.remove(+id);
  }
}
