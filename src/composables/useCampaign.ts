import type { Campaign } from '@/mocks/campaigns';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useCampaignStore } from '@/stores/useCampaignStore';

export const useCampaign = () => {
  const toast = useToast();
  const campaignStore = useCampaignStore();
  const donations = ref<Map<string, number | null>>(
    new Map(),
  );
  const getDonation = (campaignId: string) => donations.value.get(campaignId) ?? null;
  const setDonation = (campaignId: string, value: number | null) => donations.value
    .set(campaignId, value);
  const donate = (campaign: Campaign, amount: number | null) => {
    if (!amount || amount <= 0) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please enter a valid donation amount',
        life: 3000,
      });
      return;
    }

    campaignStore.updateCampaign(campaign.id, {
      amount: campaign.amount + amount,
    });

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Thank you for your donation of $${amount}!`,
      life: 3000,
    });
    setDonation(campaign.id, null);
  };

  return {
    donate,
    getDonation,
    setDonation,
  };
};
