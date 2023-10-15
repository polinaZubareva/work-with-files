import { VideoService } from './video.service';
import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';

@Controller('/user')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post(':id/uploadVideo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    return await this.videoService.saveVideo(id, file.buffer);
  }
}
