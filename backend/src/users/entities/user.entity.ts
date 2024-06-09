import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
} from 'typeorm';
import { Article } from 'src/articles/entities/article.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @OneToMany('Article', 'user')
  articles: Relation<Article>[];

  @OneToMany('Like', 'user')
  likes: Like[];

  @OneToMany('Comment', 'user')
  comments: Relation<Comment>[];
}
