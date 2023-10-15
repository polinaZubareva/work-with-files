import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo, UserPhotos } from 'src/entity';
import { UserService } from 'src/user/user.service';
import { TPhoto } from './photo.type';

@Injectable()
export class PhotoService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Photo)
    private photoRepo: Repository<Photo>,
    @InjectRepository(UserPhotos)
    private userPhotosRepo: Repository<UserPhotos>
  ) {}

  public async savePhoto(id: number, photo: string) {
    const user = await this.userService.findOne('id', id);
    if (!user.ok) throw new NotFoundException('User not found');

    const addedPhoto = this.photoRepo.create({
      photoName: photo,
    });
    const addedResult: TPhoto = { status: false };
    await this.photoRepo
      .save(addedPhoto)
      .then((value) => {
        this.addUserPhotoKeys(id, value.id);
        addedResult.status = true;
        addedResult.photo = value;
      })
      .catch((reason) => {
        addedResult.error = reason.message;
      });

    return addedResult;
  }

  private async addUserPhotoKeys(userId: number, photoId: number) {
    return await this.userPhotosRepo.save({ userId, photoId });
  }

  async getPhotoName(id: number) {
    return await this.photoRepo.findOneBy({ id });
  }
}
