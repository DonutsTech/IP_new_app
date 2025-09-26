import express from 'express';
import cors from 'cors';
import { errorHandler } from '../middlewares/errorHandler';
import { WebhookRouter } from '../modules/webhook/webhook.router';
import { AuthRouter } from '../modules/auth/auth.router';
import { PlanRouter } from '../modules/Plan/plan.router';
import { CheckoutRouter } from '../modules/checkout/checkout.router';
import { VideoRouter } from '../modules/video/vide.router';

class App {
  public express: express.Express;

  constructor() {
    this.express = express();
    this.webhook();
    this.midleware();
    this.routes();
  }

  private midleware(): void {
    this.express.use(express.json());
    this.express.use(
      cors({
        origin: '*', // permite qualquer origem
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      }),
    );
  }

  private routes(): void {
    const router = express.Router();
    router.get('/', (req, res) => {
      res.send('Works well');
    });
    const path = require('path');
    this.express.use('/uploads', express.static(path.resolve(__dirname, '../../uploads')));
    AuthRouter.create(router);
    PlanRouter.create(router);
    CheckoutRouter.create(router);
    VideoRouter.create(router);
    this.express.use('/backend', router);
    this.express.use(errorHandler);
  }

  private webhook(): void {
    const router = express.Router();
    WebhookRouter.create(router);
    this.express.use('/data', router);
  }
}

export default new App().express;
