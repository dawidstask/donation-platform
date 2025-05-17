<script setup lang="ts">
const campaigns = [
  {
    id: 1,
    title: 'Clean Water Project',
    description: 'Help bring clean water to villages.',
  },
  {
    id: 2,
    title: 'Tree Planting',
    description: 'Support reforestation efforts worldwide.',
  },
];
</script>

<template>
  <div class="p-6">
    <h2 class="text-xl font-semibold mb-4">Fundraising Campaigns</h2>
    <div v-for="campaign in campaigns" :key="campaign.id" class="mb-4 border p-4 rounded">
      <h3 class="font-bold">{{ campaign.title }}</h3>
      <p>{{ campaign.description }}</p>
      <button class="mt-2 bg-blue-500 text-white px-4 py-1 rounded">Donate</button>
    </div>
  </div>
</template>
