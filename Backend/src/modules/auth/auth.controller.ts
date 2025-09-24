import { authService } from './auth.service';
import { LoginUserDTO } from './interface/loginUser.dto';
import { RegisterUserDTO } from './interface/registerUser.dto';
import type { NextFunction, Request, Response } from 'express';

class AuthController {
  async register(request: Request, response: Response, next: NextFunction) {
    try {
      const { NAME, EMAIL, HASHED_PASSWORD, PHONE }: RegisterUserDTO = request.body;
      const create = await authService.register({ NAME, EMAIL, HASHED_PASSWORD, PHONE });
      return response.status(200).json(create);
    } catch (error) {
      next(error);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const { EMAIL, HASHED_PASSWORD }: LoginUserDTO = request.body;
      const login = await authService.login({ EMAIL, HASHED_PASSWORD });
      return response.status(200).json(login);
    } catch (error) {
      next(error);
    }
  }

  async me(request: Request, response: Response, next: NextFunction) {
    try {
      const { user } = request;
      const me = await authService.me(user.ID);
      return response.status(200).json(me);
    } catch (error) {
      next(error);
    }
  }

  async validateEmail(request: Request, response: Response, next: NextFunction) {
    try {
      const { user } = request;
      const validate = await authService.validateEmail(user.ID);
      return response.status(200).json(validate);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(request: Request, response: Response, next: NextFunction) {
    try {
      const { EMAIL } = request.body;
      const forgot = await authService.forgotPassword(EMAIL);
      return response.status(200).json(forgot);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(request: Request, response: Response, next: NextFunction) {
    try {
      const { user } = request;
      const { HASHED_PASSWORD, CODE } = request.body;
      const reset = await authService.resetPassword({ ID: user.ID, HASHED_PASSWORD, CODE });
      return response.status(200).json(reset);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
