import { NextFunction, raw, Request, Response, Router } from 'express';
import WebhookController from './webhook.controller';

class WebhookRouter {
  public static create(router: Router) {
    const endpoint = new WebhookController();

    router.post(
      '/webhook',
      raw({ type: 'application/json' }),
      (req: Request, res: Response, next: NextFunction) => {
        endpoint.webhook(req, res, next);
      },
    );
  }
}

export { WebhookRouter };
