<script setup lang="ts">
import DataView from 'primevue/dataview';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { useCampaignStore } from '@/stores/useCampaignStore';

const campaignStore = useCampaignStore();
</script>

<template>
  <Card>
    <template #title>
      Campaigns
    </template>
    <template #content>
      <DataView :value="campaignStore.campaigns" paginator :rows="5">
        <template #list="slotProps">
          <div class="campaigns-wrapper">
            <div v-for="(item, index) in slotProps.items" :key="index" class="campaigns">
              <div class="campaigns__item">
                <div class="campaigns__image">
                  <img :src="item.image" :alt="item.name" />
                  <div class="campaigns__tag">
                    <!-- <Tag :value="item.inventoryStatus" :severity="getSeverity(item)"></Tag>-->
                  </div>
                </div>
                <div class="campaigns__content">
                  <div class="campaigns__details">
                    <div>
                      <span class="campaigns__category">
                        {{ item.category }}
                      </span>
                      <div class="campaigns__title">{{ item.title }}</div>
                    </div>
                  </div>
                  <div class="campaigns__actions">
                    <span class="campaigns__price">${{ item.price }}</span>
                    <div class="campaigns__buttons">
                      <Button
                        icon="pi pi-shopping-cart"
                        label="Donate"
                        class="campaigns__buy-button"
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
    height: 120px;
    flex-direction: column;
    @media (min-width: 961px) {
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

  &__tag {
    position: absolute;
    left: 4px;
    top: 4px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 4px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 1.5rem;
    padding-left: 1rem;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: start;
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

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media (min-width: 768px) {
      align-items: flex-end;
    }
  }

  &__price {
    font-size: 1.25rem;
    font-weight: 600;
  }

  &__buttons {
    display: flex;
    flex-direction: row-reverse;
    gap: 0.5rem;

    @media (min-width: 768px) {
      flex-direction: row;
    }
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
