import { campaigns } from '@/mocks/campaigns';
import { categories } from '@/mocks/categories';
import type { Campaign } from '@/mocks/campaigns';
import type { CampaignCategory } from '@/mocks/categories';

const delay = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export const api = {
  campaigns: {
    getAll: async (): Promise<Campaign[]> => {
      await delay(800);
      return [...campaigns];
    },
    getById: async (id: string): Promise<Campaign | undefined> => {
      await delay(500);
      return campaigns.find((campaign) => campaign.id === id);
    },
    create: async (campaign: Omit<Campaign, 'id'>): Promise<Campaign> => {
      await delay(1000);
      const newCampaign = {
        ...campaign,
        id: Math.random().toString(36).substring(7),
      };
      campaigns.push(newCampaign);
      return { ...newCampaign };
    },
    update: async (id: string, campaign: Partial<Campaign>): Promise<Campaign | undefined> => {
      await delay(800);
      const index = campaigns.findIndex((c) => c.id === id);
      if (index === -1) return undefined;

      const updatedCampaign = {
        ...campaigns[index],
        ...campaign,
      };
      campaigns[index] = updatedCampaign;
      return { ...updatedCampaign };
    },
    delete: async (id: string): Promise<boolean> => {
      await delay(600);
      const index = campaigns.findIndex((c) => c.id === id);
      if (index === -1) return false;

      campaigns.splice(index, 1);
      return true;
    },
  },
  categories: {
    getAll: async (): Promise<CampaignCategory[]> => {
      await delay(600);
      return [...categories];
    },
    getById: async (id: string): Promise<CampaignCategory | undefined> => {
      await delay(400);
      return categories.find((category) => category.id === id);
    },
  },
};
