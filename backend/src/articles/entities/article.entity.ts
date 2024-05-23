import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

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

  @Column({})
  userId: number;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: 'userId' })
  user: User;
}
