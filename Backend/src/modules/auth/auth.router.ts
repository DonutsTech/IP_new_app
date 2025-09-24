import { Router } from 'express';
import AuthController from './auth.controller';
import schemaValidator from '../../middlewares/schemaValidator';
import { isAuthenticateToken } from '../../middlewares/isAuthenticateToken';
import { isAuthenticate } from '../../middlewares/isAuthenticate';

class AuthRouter {
  public static create(router: Router): void {
    const endpoint = new AuthController();

    router.get('/me', isAuthenticateToken, endpoint.me);
    router.get('/validate-email', isAuthenticate, endpoint.validateEmail);

    router.post('/register', schemaValidator('auth/register'), endpoint.register);
    router.post('/login', schemaValidator('auth/login'), endpoint.login);
    router.post('/forget', schemaValidator('auth/forget'), endpoint.forgotPassword);
    router.post('/reset', isAuthenticate, schemaValidator('auth/reset'), endpoint.resetPassword);
  }
}

export { AuthRouter };
