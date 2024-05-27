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
  Req,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/auth.decorator';
import {
  Action,
  CaslAbilityFactory,
} from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Article } from './entities/article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @GetUser() userInfo: { username: string; id: number },
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return this.articlesService.create(userInfo.id, createArticleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @GetUser()
    { username, id }: { username: string; id: number },
  ) {
    const articles = await this.articlesService.findAll(id);
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @GetUser() userInfo: { username: string; id: number },
    @Param('id') id: string,
  ) {
    const ability = this.caslAbilityFactory.createForUser(userInfo);

    if (ability.cannot(Action.Delete, Article)) {
      throw new ForbiddenException(
        'You have no permission to delete this article',
      );
    }
    // this.articlesService.remove(+id);
    return {
      status: 'ok',
      message: `Article with id ${id} has been deleted`,
    };
  }
}
