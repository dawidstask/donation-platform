<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  onMounted,
} from 'vue';
import { useCampaignStore } from '@/stores/useCampaignStore';
import { useCampaign } from '@/composables/useCampaign';
import { useToast } from 'primevue/usetoast';
import type { Campaign } from '@/mocks/campaigns';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import SplitButton from 'primevue/splitbutton';
import Button from 'primevue/button';
import DataView from 'primevue/dataview';
import Card from 'primevue/card';
import CampaignAction from '@/components/CampaignAction.vue';

const campaignStore = useCampaignStore();
const { donate, getDonation, setDonation } = useCampaign();
const toast = useToast();
const dialog = ref(false);
const selectedCampaign = ref<Campaign | null>(null);

onMounted(async () => {
  await campaignStore.fetchCampaigns();
  await campaignStore.fetchCategories();
});

const search = ref<string>('');
const debouncedSearch = ref<string>('');

watch(search, (newValue) => {
  const timeoutId = setTimeout(() => {
    debouncedSearch.value = newValue;
  }, 300);

  return () => clearTimeout(timeoutId);
});

const filteredCampaigns = computed(() => {
  if (!debouncedSearch.value) return campaignStore.campaigns;

  const searchLower = debouncedSearch.value.toLowerCase();
  return campaignStore.campaigns.filter((campaign) => {
    const titleMatch = campaign.title.toLowerCase().includes(searchLower);
    const descMatch = campaign.description.toLowerCase().includes(searchLower);
    const categoryMatch = campaignStore.getCategoryLabel(campaign.category!)
      .toLowerCase()
      .includes(searchLower);
    return titleMatch || descMatch || categoryMatch;
  });
});

const handleEdit = (campaign: Campaign) => {
  selectedCampaign.value = campaign;
  dialog.value = true;
};

const handleDelete = async (campaign: Campaign) => {
  try {
    await campaignStore.deleteCampaign(campaign.id);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Campaign deleted successfully',
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to delete campaign',
      life: 3000,
    });
  }
};

const items = (campaign: Campaign) => [
  {
    label: 'Edit',
    command: () => handleEdit(campaign),
  },
  {
    label: 'Delete',
    command: () => handleDelete(campaign),
  },
];

const onManageClick = () => {
  selectedCampaign.value = null;
  dialog.value = true;
};
</script>

<template>
  <Card>
    <template #title>
      <div class="create">
        <Button
          label="Create Campaign"
          @click="onManageClick"
        />
        <CampaignAction
          v-model:visible="dialog"
          :campaign="selectedCampaign"
        />
      </div>
      <div class="header">
        <span class="header__title">Campaigns</span>
        <InputText v-model="search" placeholder="Search campaigns..." />
      </div>
    </template>
    <template #content>
      <DataView :value="filteredCampaigns" paginator :rows="5">
        <template #list="slotProps">
          <div class="campaigns-wrapper">
            <div v-for="(item, index) in slotProps.items" :key="index" class="campaigns">
              <div class="campaigns__item">
                <div class="campaigns__image">
                  <img :src="item.image" :alt="item.name" />
                </div>
                <div class="campaigns__content">
                  <div class="campaigns__details">
                    <div>
                      <span class="campaigns__category">
                         {{ campaignStore.getCategoryLabel(item.category) }}
                      </span>
                      <div class="campaigns__title">{{ item.title }}</div>
                      <div class="campaigns__description">{{ item.description }}</div>
                    </div>
                  </div>
                  <div class="campaigns__actions">
                    <div>
                      <span class="campaigns__amount">${{ item.amount }}</span>
                      <div class="campaigns__buttons">
                        <div class="campaigns__input">
                          <InputNumber
                            :modelValue="getDonation(item.id)"
                            @update:modelValue="(value) => setDonation(item.id, value)"
                            inputId="minmax-buttons"
                            showButtons
                            :min="0"
                            :max="10000"
                            mode="currency"
                            currency="USD"
                            locale="en-US"
                          />
                        </div>
                        <Button
                          label="Donate"
                          class="campaigns__buy-button"
                          @click="donate(item, getDonation(item.id))"
                        />
                      </div>
                    </div>
                    <div>
                      <SplitButton
                        :model="items(item)"
                        label="Manage"
                        severity="warn"
                        @click="handleEdit(item)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.create {
  display: flex;
  align-items: center;
  justify-content: end;
  margin-bottom: 1rem;
}
.header {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  @media (min-width: 500px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  &__title {
    margin-bottom: 0.5rem;
    @media (min-width: 500px) {
      margin-bottom: unset;
    }
  }
}
.campaigns-wrapper {
  display: flex;
  flex-direction: column;
}
.campaigns {
  &:nth-child(even) {
    background-color: var(--p-surface-800);
  }

  &__item {
    display: flex;
    flex-direction: column;
    @media (min-width: 961px) {
      height: 120px;
      flex-direction: row;
    }
  }

  &__image {
    width: auto;
    position: relative;

    img {
      width: 200px;
      height: auto;
      object-fit: cover;
      height: -webkit-fill-available;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 1.5rem;
    padding: 1rem;

    @media (min-width: 768px) {
      padding: 0 0 0 1rem;
      flex-direction: row;
      align-items: center;
    }
  }

  &__details {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.5rem;

    @media (min-width: 768px) {
      flex-direction: column;
    }
  }

  &__category {
    font-size: 0.875rem;
    font-weight: 500;
    color: #64748b;
  }

  &__title {
    font-size: 1.125rem;
    font-weight: 500;
    margin-top: 0.5rem;
  }

  &__description {
    font-size: 0.875rem;
    color: #64748b;
    margin-top: 0.5rem;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media (min-width: 768px) {
      align-items: flex-end;
      flex-direction: row;
    }
  }

  &__amount {
    font-size: 1.25rem;
    font-weight: 600;
  }

  &__buttons {
    display: grid;
    gap: 1rem;

    @media (min-width: 500px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 768px) {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
    }
  }

  &__input .p-inputnumber {
    width: 100%;
  }

  &__buy-button {
    flex: auto;
    white-space: nowrap;

    @media (min-width: 768px) {
      flex: initial;
    }
  }
}
</style>
