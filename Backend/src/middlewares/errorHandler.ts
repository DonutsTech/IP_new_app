import { NextFunction, Request, Response } from 'express';
import { AppError } from '../erros';
import multer from 'multer';

export function errorHandler(err: Error, request: Request, response: Response, next: NextFunction) {
  if (err instanceof AppError) {
    return response.status(err.statusCode as number).json({
      STATUS: err.statusCode,
      MESSAGE: err.message,
    });
  }
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return response.status(400).json({
        STATUS: 400,
        MESSAGE: 'O arquivo ultrapassa o limite permitido.',
      });
    }
    return response.status(400).json({
      STATUS: 400,
      MESSAGE: err.message,
    });
  }
  console.error(err);
  return response.status(500).json({
    STATUS: 500,
    MESSAGE: 'Erro inesperado, tente novamente mais tarde!',
  });
}
