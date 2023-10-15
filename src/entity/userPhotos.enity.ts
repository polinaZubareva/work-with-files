import { Entity, JoinColumn, ManyToMany, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Photo } from './photo.entity';

@Entity('user_photos')
export class UserPhotos {
  @PrimaryColumn({ name: 'userId' })
  userId: number;

  @PrimaryColumn({ name: 'photoId' })
  photoId: number;

  @ManyToMany(() => User)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  users: User[];

  @ManyToMany(() => Photo)
  @JoinColumn([{ name: 'photoId', referencedColumnName: 'id' }])
  photos: Photo[];
}
