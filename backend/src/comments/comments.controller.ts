import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import {
  CreateCommentDto,
  FindAllDto,
  UpdateCommentDto,
} from './dto/comment.dto';
import { GetUser } from 'src/auth/auth.decorator';
import { TAuthValidateResponse } from 'src/auth/dto/auth.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @GetUser() userInfo: TAuthValidateResponse,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(userInfo.id, createCommentDto);
  }

  @Get()
  findAll(@Query() findAllDto: FindAllDto): Promise<Comment[]> {
    return this.commentsService.findAll(findAllDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
