import { Router } from 'express';
import CampaignController from './campaign.controller';
import { isAuthenticateToken } from '../../middlewares/isAuthenticateToken';
import { isValidateUserPlan } from '../../middlewares/isValidateUserPlan';
import schemaValidator from '../../middlewares/schemaValidator';

class CampaignRouter {
  public static create(router: Router): void {
    const endpoint = new CampaignController();

    router.post(
      '/campaigns',
      isAuthenticateToken,
      isValidateUserPlan,
      schemaValidator('campaign/create'),
      endpoint.createCampaign,
    );
  }
}

export { CampaignRouter };
