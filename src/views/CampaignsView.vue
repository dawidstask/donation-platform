<script setup lang="ts">
import DataView from 'primevue/dataview';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import SplitButton from 'primevue/splitbutton';
import { ref, computed, watch } from 'vue';
import { useCampaignStore } from '@/stores/useCampaignStore';
import type { Campaign } from '@/mocks/campaigns';
import { useCampaign } from '@/composables/useCampaign';
import CampaignAction from '@/components/CampaignAction.vue';

const campaignStore = useCampaignStore();
const { donate, getDonation, setDonation } = useCampaign();

const search = ref<string>('');
const debouncedSearch = ref<string>('');
const isDialogVisible = ref(false);

watch(search, (newValue) => {
  const timeoutId = setTimeout(() => {
    debouncedSearch.value = newValue;
  }, 500);

  return () => clearTimeout(timeoutId);
});

const matchesSearch = (campaign: Campaign, searchTerm: string) => {
  const searchLower = searchTerm.toLowerCase();
  return campaign.title.toLowerCase().includes(searchLower)
    || campaign.description.toLowerCase().includes(searchLower)
    || campaignStore.getCategoryById(campaign.category)?.toLowerCase().includes(searchLower);
};

const filteredCampaigns = computed(() => campaignStore.campaigns
  .filter((campaign) => matchesSearch(campaign, debouncedSearch.value)));

const items = [
  {
    label: 'Edit',
    command: () => {
      // toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
      console.log('edit');
    },
  },
  {
    label: 'Delete',
    command: () => {
      // toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
      console.log('delete');
    },
  },
];

const onManageClick = () => {
  // toast.add({ severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000 });
  console.log('click');
};
</script>

<template>
  <Card>
    <template #title>
      <div class="create">
        <Button
          label="Create Campaign"
          @click="isDialogVisible = true"
        />
        <CampaignAction v-model:visible="isDialogVisible" />
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
                        {{ campaignStore.getCategoryById(item.category) }}
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
                        :model="items"
                        label="Manage"
                        severity="warn"
                        @save="onManageClick"
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
