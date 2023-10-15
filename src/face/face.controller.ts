import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { FaceService } from './face.service';
import { Response } from 'express';
import { join } from 'path';

@Controller('/user/photo/detect')
export class FaceController {
  constructor(private readonly faceService: FaceService) {}
  @Get('/render')
  async getDetection(
    @Res() res: Response,
    @Query('mode') mode: string,
    @Query('render') render: string,
    @Query('renderLandmark') renderLandmark: string,
    @Body() file: { fileName: string }
  ) {
    try {
      const isMultiple = mode === 'multiple';
      const isRender = render === 'true';
      const isRenderLandmark = renderLandmark === 'true';

      console.log(
        'dirname  ' + join(__dirname, '..', '/photo', '/upload', file.fileName)
      );

      let result: any;
      if (isMultiple) {
        result = await this.faceService.encodings(
          join(__dirname, '..', '/photo', '/upload', file.fileName),
          isRender,
          isRenderLandmark
        );
      } else {
        result = await this.faceService.encoding(
          join(__dirname, '..', '/photo', '/upload', file.fileName),
          isRender,
          isRenderLandmark
        );
      }

      if (isRender || isRenderLandmark) {
        res.writeHead(200, {
          'Content-Type': 'applicationy/json',
          'Content-Length': result.length,
        });
        res.end(result);
      } else {
        res.send({ data: result });
      }
    } catch (e) {
      throw new HttpException(
        { message: e.message },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
  }
}
