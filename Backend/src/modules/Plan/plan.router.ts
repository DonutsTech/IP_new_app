import { Router } from 'express';
import PlanController from './plan.controller';

class PlanRouter {
  public static create(router: Router) {
    const endpoint = new PlanController();

    router.get('/plans', endpoint.getAll);
  }
}

export { PlanRouter };
