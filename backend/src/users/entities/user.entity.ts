import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
} from 'typeorm';
import { Article } from 'src/articles/entities/article.entity';
import { Like } from 'src/likes/entities/like.entity';

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

  @OneToMany(() => Article, (article) => article.user)
  articles: Relation<Article>[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Relation<Like>[];
}
