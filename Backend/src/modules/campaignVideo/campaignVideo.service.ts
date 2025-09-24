import { Campaign_Video, Prisma } from '@prisma/client';
import prisma from '../../prisma';
import { AppError } from '../../erros';

class CampaignVideoService {
  async create(data: Prisma.Campaign_VideoCreateInput): Promise<Campaign_Video> {
    try {
      const campaignVideo = await prisma.campaign_Video.create({
        data,
      });
      return campaignVideo;
    } catch (error) {
      throw new AppError('Erro ao associar vídeo à campanha', 500);
    }
  }
}

export const campaignVideoService = new CampaignVideoService();
