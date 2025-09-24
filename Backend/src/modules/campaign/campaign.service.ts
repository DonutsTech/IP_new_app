import { Campaign, Prisma } from '@prisma/client';
import { CreateCampaignDTO } from './interface/createCampaign';
import prisma from '../../prisma';
import { AppError } from '../../erros';
import { campaignVideoService } from '../campaignVideo/campaignVideo.service';

class CampaignService {
  async createCampaign(userId: string, campaignData: CreateCampaignDTO): Promise<any> {
    try {
      let createCampaign = await this.create({
        NAME: campaignData.NAME,
        USER: { connect: { ID: userId } },
      });

      for (const videoId of campaignData.VIDEOS) {
        const videoCampaign = await campaignVideoService.create({
          CAMPAIGN: { connect: { ID: createCampaign.ID } },
          VIDEO: { connect: { ID: videoId.VIDEO_ID } },
          ORDER: videoId.ORDER,
        });

        for (const bond of videoId.BONDS) {
          await prisma.bond_Video.create({
            data: {
              BOND: {
                create: {
                  BUTTON: bond.BUTTON,
                  BUTTON_START: bond.BUTTON_START,
                  BUTTON_TEXT: bond.BUTTON_TEXT,
                  BUTTON_STYLE: bond.BUTTON_STYLE,
                  VIDEO: { connect: { ID: bond.VIDEO_ID } },
                },
              },
              CAMPAIGN_VIDEOS: { connect: { ID: videoCampaign.ID } },
            },
          });
        }
      }

      createCampaign = (await this.campaign({ ID: createCampaign.ID })) as Campaign;

      return createCampaign;
    } catch (error) {
      throw error;
    }
  }

  async create(data: Prisma.CampaignCreateInput): Promise<Campaign> {
    try {
      const campaign = await prisma.campaign.create({
        data,
      });
      return campaign;
    } catch (error) {
      throw new AppError('Erro ao criar campanha', 500);
    }
  }

  async campaign(
    campaignWhereUniqueInput: Prisma.CampaignWhereUniqueInput,
  ): Promise<Campaign | null> {
    return await prisma.campaign.findUnique({
      where: campaignWhereUniqueInput,
      include: {
        CAMPAIGN_VIDEOS: {
          include: {
            BONDS: {
              include: {
                BOND: true,
              },
            },
            VIDEO: true,
          },
        },
        USER: true,
        FEATURE: true,
      },
    });
  }
}

export const campaignService = new CampaignService();
