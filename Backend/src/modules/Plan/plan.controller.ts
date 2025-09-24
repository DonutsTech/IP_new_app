import { NextFunction, Request, Response } from 'express';
import { planService } from './plan.service';

class PlanController {
  async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const plans = await planService.plans({
        where: { STATUS: true },
        select: {
          ID: true,
          PLAN: true,
          PLAYS: true,
          PLAYS_PRICE: true,
          PRICE: true,
          STATUS: true,
          VIDEO_LIMIT: true,
          STRIPE_PLAN_ID: true,
          STRIPE_PLAN_PRICE: true,
        },
      });
      return response.status(200).json(plans);
    } catch (error) {
      next(error);
    }
  }
}

export default PlanController;
