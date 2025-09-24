export interface CreateCampaignDTO {
  NAME: string;
  VIDEOS: VideoCampaignDTO[];
}

export interface VideoCampaignDTO {
  VIDEO_ID: string;
  ORDER: number;
  BONDS: BondCampaignDTO[];
}

export interface BondCampaignDTO {
  VIDEO_ID: string;
  BUTTON: boolean;
  BUTTON_TEXT: string;
  BUTTON_STYLE: string;
  BUTTON_START: number;
  ORDER: number;
}
