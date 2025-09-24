import { Request, Response, NextFunction } from 'express';
import { AppError } from '../erros';
import { planService } from '../modules/Plan/plan.service';
import { videoService } from '../modules/video/video.service';

export async function isValidateLimitVideo(req: Request, res: Response, next: NextFunction) {
  try {
    const { user } = req;

    if (!user) {
      throw new AppError('Usuário não encontrado na requisição', 401);
    }

    const plan = await planService.showId(user.PLAN_ID);

    if (!plan) {
      throw new AppError('Plano do usuário não encontrado', 404);
    }

    const videoCount = await videoService.videoCountByUser(user.ID);

    if (videoCount >= plan.VIDEO_LIMIT) {
      throw new AppError('Limite de vídeos atingido para o seu plano', 403);
    }

    next();
  } catch (error) {
    next(error);
  }
}
