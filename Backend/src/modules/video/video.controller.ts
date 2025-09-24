import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../../erros';
import ffmpeg from 'fluent-ffmpeg';
import { videoService } from './video.service';

class VideoController {
  public async createVideo(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.file) {
        throw new AppError('Nenhum arquivo de vídeo foi enviado', 400);
      }

      const { user } = request;

      const result = await videoService.createVideo(user.ID, request.file);

      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async videosByUser(request: Request, response: Response, next: NextFunction) {
    try {
      const { user } = request;

      const result = await videoService.videosByUser(user.ID);

      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async updateVideo(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const { NAME } = request.body;

      const result = await videoService.updateVideo(id, { NAME });

      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async videoById(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const result = await videoService.videoById(id);

      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default VideoController;
