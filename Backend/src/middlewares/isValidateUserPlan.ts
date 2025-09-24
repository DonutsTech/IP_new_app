import { Request, Response, NextFunction } from 'express';
import { AppError } from '../erros';

export function isValidateUserPlan(req: Request, res: Response, next: NextFunction) {
  try {
    const { user } = req;

    if (!user) {
      throw new AppError('Usuário não encontrado na requisição', 401);
    }

    if (user.ACTIVE === false) {
      throw new AppError('Você precisa de um plano ativo para acessar este recurso', 403);
    }

    next();
  } catch (error) {
    next(error);
  }
}
