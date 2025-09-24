import type { NextFunction, Request, Response } from 'express';
import { CreateCampaignDTO } from './interface/createCampaign';
import { campaignService } from './campaign.service';

class CampaignController {
  async createCampaign(request: Request, response: Response, next: NextFunction) {
    try {
      const { user } = request;
      const campaignData: CreateCampaignDTO = request.body;

      const data = await campaignService.createCampaign(user.ID, campaignData);

      response.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default CampaignController;
