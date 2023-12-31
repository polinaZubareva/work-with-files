import { Video } from './video.entity';
import { Entity, JoinColumn, ManyToMany, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_videos')
export class UserVideos {
  @PrimaryColumn({ name: 'userId' })
  userId: number;

  @PrimaryColumn({ name: 'videoId' })
  videoId: number;

  @ManyToMany(() => User)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  users: User[];

  @ManyToMany(() => Video)
  @JoinColumn([{ name: 'videoId', referencedColumnName: 'id' }])
  videos: Video[];
}
