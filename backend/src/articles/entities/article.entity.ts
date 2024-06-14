import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Relation,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column()
  userId: number;

  @ManyToOne('User', 'articles')
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany('Like', 'article')
  likes: Relation<Like>[];

  @OneToMany('Comment', 'article')
  comments: Relation<Comment>[];
}
