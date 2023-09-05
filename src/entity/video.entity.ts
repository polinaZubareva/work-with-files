import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '.';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'bytea',
  })
  videoData: Buffer;

  @ManyToOne(() => User, (user) => user.videos)
  user: User;
}
