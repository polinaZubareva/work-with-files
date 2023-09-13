import { Video } from './video.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_videos')
export class UserVideos {
  @PrimaryColumn({ name: 'userId' })
  userId: number;

  @PrimaryColumn({ name: 'videoId' })
  videoId: number;

  @ManyToOne(() => User, (user) => user.videos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  users: User[];

  @ManyToOne(() => Video, (video) => video.user, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'videoId', referencedColumnName: 'id' }])
  videos: Video[];
}
