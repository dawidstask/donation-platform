<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Welcome, {{ userStore.name }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';

const userStore = useUserStore();
</script>
