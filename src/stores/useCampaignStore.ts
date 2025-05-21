import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Campaign } from '@/mocks/campaigns';
import type { CampaignCategory } from '@/mocks/categories';
import { api } from '@/services/api';

export const useCampaignStore = defineStore('campaign', () => {
  const campaigns = ref<Campaign[]>([]);
  const categories = ref<CampaignCategory[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchCampaigns = async () => {
    loading.value = true;
    error.value = null;
    try {
      campaigns.value = await api.campaigns.getAll();
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch campaigns';
    } finally {
      loading.value = false;
    }
  };

  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;
    try {
      categories.value = await api.categories.getAll();
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch categories';
    } finally {
      loading.value = false;
    }
  };

  const createCampaign = async (campaign: Omit<Campaign, 'id'>) => {
    loading.value = true;
    error.value = null;
    try {
      const newCampaign = await api.campaigns.create(campaign);
      campaigns.value = [...campaigns.value, newCampaign];
      return newCampaign;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create campaign';
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const updateCampaign = async (id: string, campaign: Partial<Campaign>) => {
    loading.value = true;
    error.value = null;
    try {
      const updatedCampaign = await api.campaigns.update(id, campaign);
      if (updatedCampaign) {
        campaigns.value = campaigns.value.map((c) => {
          if (c.id === id) {
            return updatedCampaign;
          }
          return c;
        });
      }
      return updatedCampaign;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update campaign';
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const deleteCampaign = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      await api.campaigns.delete(id);
      campaigns.value = campaigns.value.filter((c) => c.id !== id);
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete campaign';
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const getCampaignById = (id: string) => campaigns.value
    .find((c) => c.id === id);
  const getCategoryLabel = (category: string) => categories.value
    .find((c) => c.id === category)?.label;
  const getCampaignsByCategory = (category: string) => campaigns.value
    .filter((c) => c.category === category);

  const getTotalAmount = computed(() => campaigns.value
    .reduce((sum, campaign) => sum + campaign.amount, 0));

  return {
    campaigns,
    categories,
    loading,
    error,
    fetchCampaigns,
    fetchCategories,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    getCampaignById,
    getCategoryLabel,
    getCampaignsByCategory,
    getTotalAmount,
  };
});
