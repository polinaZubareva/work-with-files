import '@tensorflow/tfjs-node';
import { Injectable } from '@nestjs/common';
import * as faceapi from 'face-api.js';
import { TinyFaceDetectorOptions } from 'face-api.js';
import { unlink } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

@Injectable()
export class FaceService {
  private _canvas: any;
  private removeFile: Promise<any> | any;
  private faceDetectorOptions: TinyFaceDetectorOptions;

  constructor() {
    this.initFaceAPI();
    this.faceDetectorOptions = new TinyFaceDetectorOptions({ inputSize: 640 });
    this.removeFile = promisify(unlink);
  }

  async initFaceAPI() {
    this._canvas = require('canvas');

    const { Canvas, Image, ImageData } = this._canvas;
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

    await faceapi.nets.tinyFaceDetector.loadFromDisk(
      join(__dirname, '../..', 'models')
    );
    await faceapi.nets.faceLandmark68TinyNet.loadFromDisk(
      join(__dirname, '../..', 'models')
    );
    await faceapi.nets.faceRecognitionNet.loadFromDisk(
      join(__dirname, '../..', 'models')
    );
  }

  get canvas() {
    return this._canvas;
  }

  drawFace(
    result: any,
    image: any,
    isRender: boolean,
    isRenderLandmark: boolean
  ) {
    const out = faceapi.createCanvasFromMedia(image) as any;
    if (isRender) {
      console.log(result.detection);

      faceapi.draw.drawDetections(
        out,
        Array.isArray(result)
          ? result.map((o) => o.detection)
          : result.detection
      );
    }
    if (isRenderLandmark) {
      faceapi.draw.drawFaceLandmarks(
        out,
        Array.isArray(result)
          ? result.map((o) => o.landmarks)
          : result.landmarks
      );
    }

    return out.toBuffer('image/jpg');
  }

  async encoding(
    imagePath: string,
    isRender: boolean,
    isRenderLandmark: boolean
  ) {
    const image = await this.canvas.loadImage(imagePath);
    await this.removeFile(imagePath);

    const result = await faceapi
      .detectSingleFace(image, this.faceDetectorOptions)
      .withFaceLandmarks(true)
      .withFaceDescriptor();

    if (isRender || isRenderLandmark) {
      return this.drawFace(result, image, isRender, isRenderLandmark);
    } else {
      return {
        detection: {
          x: result.alignedRect.box.x,
          y: result.alignedRect.box.y,
          wdth: result.alignedRect.box.width,
          height: result.alignedRect.box.height,
          score: result.alignedRect.score,
        },
        encodings: Array.from(result.descriptor),
      };
    }
  }

  async encodings(
    imagePath: string,
    isRender: boolean,
    isRenderLandmark: boolean
  ) {
    const image = await this.canvas.loadImage(imagePath);
    await this.removeFile(imagePath);

    const result = await faceapi
      .detectAllFaces(image, this.faceDetectorOptions)
      .withFaceLandmarks(true)
      .withFaceDescriptors();

    if (isRender || isRenderLandmark) {
      return this.drawFace(result, image, isRender, isRenderLandmark);
    } else {
      return result.map((o) => ({
        detection: {
          x: o.alignedRect.box.x,
          y: o.alignedRect.box.y,
          wdth: o.alignedRect.box.width,
          height: o.alignedRect.box.height,
          score: o.alignedRect.score,
        },
        encodings: Array.from(o.descriptor),
      }));
    }
  }

  async landmark(
    imagePath: string,
    isRender: boolean,
    isRenderLandmark: boolean
  ) {
    const image = await this.canvas.loadImage(imagePath);
    await this.removeFile(imagePath);

    const result = await faceapi
      .detectSingleFace(image, this.faceDetectorOptions)
      .withFaceLandmarks(true);

    if (isRender || isRenderLandmark) {
      return this.drawFace(result, image, isRender, isRenderLandmark);
    } else {
      return {
        detection: {
          x: result.alignedRect.box.x,
          y: result.alignedRect.box.y,
          width: result.alignedRect.box.width,
          height: result.alignedRect.box.height,
          score: result.alignedRect.score,
        },
        landmarks: Array.from(result.landmarks.positions).map((o) => ({
          x: o.x,
          y: o.y,
        })),
      };
    }
  }

  async landmarks(
    imagePath: string,
    isRender: boolean,
    isRenderLandmark: boolean
  ) {
    const image = await this.canvas.loadImage(imagePath);
    await this.removeFile(imagePath);
    const result = await faceapi
      .detectAllFaces(image, this.faceDetectorOptions)
      .withFaceLandmarks(true);

    if (isRender || isRenderLandmark) {
      return this.drawFace(result, image, isRender, isRenderLandmark);
    } else {
      return result.map((data) => ({
        detection: {
          x: data.alignedRect.box.x,
          y: data.alignedRect.box.y,
          width: data.alignedRect.box.width,
          height: data.alignedRect.box.height,
          score: data.alignedRect.score,
        },
        landmarks: Array.from(data.landmarks.positions).map((position) => ({
          x: position.x,
          y: position.y,
        })),
      }));
    }
  }
}
