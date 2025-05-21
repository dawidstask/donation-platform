<script setup lang="ts">
import Chart from 'primevue/chart';
import { ref, onMounted, computed } from 'vue';
import { useCampaignStore } from '@/stores/useCampaignStore';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

const { campaigns, categories } = useCampaignStore();
const chartOptions = ref();

const campaignData = computed(() => ({
  labels: campaigns.map((campaign) => campaign.title),
  datasets: [
    {
      label: 'Campaign Amounts',
      data: campaigns.map((campaign) => campaign.amount),
      backgroundColor: [
        'rgba(249, 115, 22, 0.2)',
        'rgba(6, 182, 212, 0.2)',
        'rgb(107, 114, 128, 0.2)',
        'rgba(139, 92, 246, 0.2)',
        'rgba(34, 197, 94, 0.2)',
        'rgba(239, 68, 68, 0.2)',
      ],
      borderColor: [
        'rgb(249, 115, 22)',
        'rgb(6, 182, 212)',
        'rgb(107, 114, 128)',
        'rgb(139, 92, 246)',
        'rgb(34, 197, 94)',
        'rgb(239, 68, 68)',
      ],
      borderWidth: 1,
    },
  ],
}));

const categoryData = computed(() => ({
  labels: categories.map((category) => category.label),
  datasets: [
    {
      label: 'Total Amount by Category',
      data: categories.map((category) => (
        campaigns
          .filter((campaign) => campaign.category === category.id)
          .reduce((sum, campaign) => sum + campaign.amount, 0)
      )),
      backgroundColor: [
        'rgba(249, 115, 22, 0.2)',
        'rgba(6, 182, 212, 0.2)',
        'rgb(107, 114, 128, 0.2)',
        'rgba(139, 92, 246, 0.2)',
        'rgba(34, 197, 94, 0.2)',
        'rgba(239, 68, 68, 0.2)',
      ],
      borderColor: [
        'rgb(249, 115, 22)',
        'rgb(6, 182, 212)',
        'rgb(107, 114, 128)',
        'rgb(139, 92, 246)',
        'rgb(34, 197, 94)',
        'rgb(239, 68, 68)',
      ],
      borderWidth: 1,
    },
  ],
}));

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `Amount: $${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
          callback: (value: number) => `$${value}`,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

onMounted(() => {
  chartOptions.value = setChartOptions();
});
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6">Campaign Analytics</h2>
    <TabView>
      <TabPanel header="Bar Chart" value="bar">
        <div class="chart-container">
          <Chart type="bar" :data="campaignData" :options="chartOptions" />
        </div>
      </TabPanel>
      <TabPanel header="Line Chart" value="line">
        <div class="chart-container">
          <Chart type="line" :data="campaignData" :options="chartOptions" />
        </div>
      </TabPanel>
      <TabPanel header="Pie Chart" value="pie">
        <div class="chart-container">
          <Chart type="pie" :data="campaignData" :options="chartOptions" />
        </div>
      </TabPanel>
      <TabPanel header="Category Analysis" value="category">
        <div class="chart-container">
          <Chart type="doughnut" :data="categoryData" :options="chartOptions" />
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<style scoped lang="scss">
.chart-container {
  width: 100%;
  margin: 2rem 0;
  @media (min-width: 500px) {
    width: 70%;
  }
}
</style>
