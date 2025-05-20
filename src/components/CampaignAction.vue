<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import Dialog from 'primevue/dialog';
import type { Campaign } from '@/mocks/campaigns';
import CampaignForm from './CampaignForm.vue';

defineProps<{
  visible: boolean;
  campaign?: Campaign | null;
}>();

const emit = defineEmits<{
  'update:visible': [value: boolean];
}>();
</script>

<template>
  <div class="campaign-action">
    <Dialog
      :visible="visible"
      @update:visible="(value) => emit('update:visible', value)"
      modal
      :header="campaign ? 'Edit Campaign' : 'Create Campaign'"
      :style="{ width: '50vw' }"
      :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    >
      <CampaignForm
        :initial-values="campaign"
        @submit="emit('update:visible', false)"
      />
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.campaign-action {
  display: flex;
  justify-content: flex-end;
}
</style>
