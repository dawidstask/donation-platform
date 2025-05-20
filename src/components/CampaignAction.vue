<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import Dialog from 'primevue/dialog';
import CampaignForm from './CampaignForm.vue';

defineProps<{
  visible: boolean;
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
      header="Create New Campaign"
      :style="{ width: '50vw' }"
      :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    >
      <CampaignForm @submit="emit('update:visible', false)" />
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.campaign-action {
  display: flex;
  justify-content: flex-end;
}
</style>
