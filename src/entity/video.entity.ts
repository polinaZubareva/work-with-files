import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'bytea',
  })
  videoData: Uint8Array;

  @ManyToOne(() => User, (user) => user.videos)
  user: User;
}
