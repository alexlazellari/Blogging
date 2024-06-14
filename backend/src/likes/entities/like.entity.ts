import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Article } from 'src/articles/entities/article.entity';

@Entity()
@Unique(['userId', 'articleId'])
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  articleId: number;

  @ManyToOne('Article', 'likes')
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @ManyToOne('User', 'likes')
  @JoinColumn({ name: 'userId' })
  user: User;
}
