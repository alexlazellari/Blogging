import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from 'src/articles/entities/article.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  articleId: number;

  @Column()
  content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @ManyToOne('User', 'comments')
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne('Article', 'comments')
  @JoinColumn({ name: 'articleId' })
  article: Article;
}
