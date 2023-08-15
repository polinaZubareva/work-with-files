import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Salt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  saltText: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
