import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Campaign, campaigns as initialCampaigns } from '@/mocks/campaigns';
import { CampaignCategory, categories as initialCategories } from '@/mocks/categories';

export const useCampaignStore = defineStore('campaign', () => {
  const campaigns = ref([...initialCampaigns]);
  const categories = ref<CampaignCategory[]>([...initialCategories]);

  const getCampaignById = (id: number) => campaigns.value
    .find((campaign): boolean => campaign.id === id);

  const getCampaignsByCategory = (category: string) => campaigns.value
    .filter((campaign): boolean => campaign.category === category);

  const addCampaign = (payload: Omit<Campaign, 'id'>) => campaigns.value
    .push({ id: campaigns.value.length + 1, ...payload });

  const updateCampaign = (id: number, updateData: Partial<Campaign>) => {
    const index: number = campaigns.value.findIndex((campaign): boolean => campaign.id === id);
    if (index !== -1) {
      campaigns.value[index] = { ...campaigns.value[index], ...updateData };
    }
  };

  const getCategoryById = (id: string) => categories.value
    .find((category: CampaignCategory): boolean => category.id === id)?.label;

  const deleteCampaign = (id: number) => {
    campaigns.value = campaigns.value.filter((campaign): boolean => campaign.id !== id);
  };

  return {
    getCampaignById,
    getCampaignsByCategory,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    getCategoryById,
    campaigns,
    categories,
  };
});
