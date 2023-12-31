import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '.';

@Entity()
export class Salt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  saltText: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
