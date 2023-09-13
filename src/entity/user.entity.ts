import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Video } from '.';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @OneToMany(() => Video, (video) => video.user)
  @JoinTable({
    name: 'user_videos',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'videoId',
      referencedColumnName: 'id',
    },
  })
  videos?: Video[];
}
