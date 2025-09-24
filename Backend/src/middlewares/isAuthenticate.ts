import { Request, Response, NextFunction } from 'express';
import { authService } from '../modules/auth/auth.service';
import { AppError } from '../erros';
import { userService } from '../modules/user/user.service';
import * as bycrpt from 'bcryptjs';

export async function isAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('Token não fornecido', 401);
    }

    const [, token] = authHeader.split(' ');

    const checkToken = authService.checkToken(token);

    const user = await userService.showId(checkToken.sub);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    request.user = user;

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}
