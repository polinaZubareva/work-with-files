import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserVideos, Video } from 'src/entity';
import { Repository } from 'typeorm';
import { TVideo } from './video.type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class VideoService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Video)
    private videosRepo: Repository<Video>,
    @InjectRepository(UserVideos)
    private userVideosRepo: Repository<UserVideos>
  ) {}

  public async saveVideo(id: number, videoData: Buffer) {
    const user = await this.userService.findOne('id', id);
    if (!user.ok) throw new NotFoundException('User not found');

    const addedVideo = this.videosRepo.create({
      videoData: videoData,
    });

    const addedResult: TVideo = { status: false };
    await this.videosRepo
      .save(addedVideo)
      .then((value) => {
        this.addUserVideoKeys(id, value.id);
        addedResult.video = value.id;
        addedResult.status = true;
      })
      .catch((reason) => {
        console.log('error');

        addedResult.error = reason;
      });

    return addedResult;
  }

  private async addUserVideoKeys(userId: number, videoId: number) {
    return await this.userVideosRepo.save({ userId, videoId });
  }
}
