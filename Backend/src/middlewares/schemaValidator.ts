import { RequestHandler, Request, Response, NextFunction } from 'express';
import schemas from '../schemas/schemas';
import { ObjectSchema } from 'joi';
import { AppError } from '../erros';

const supportedMethods = ['post', 'put', 'patch', 'delete'];

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

const schemaValidator = (path: string): RequestHandler => {
  const schema: ObjectSchema<any> | undefined = schemas[path];

  if (!schema) {
    throw new Error(`Schema not found for path: ${path}`);
  }

  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const method = req.method.toLowerCase();

      if (!supportedMethods.includes(method)) {
        next();
      }

      const { error, value } = schema.validate(req.body, validationOptions);

      if (error) {
        throw new AppError(`Os dados fornecidos no corpo da requisição são inválidos.`, 400);
      }

      req.body = value;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default schemaValidator;
