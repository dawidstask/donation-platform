<template>
  <Menubar v-if="user.isAuthenticated" :model="items">
    <template #item="{ item }">
      <router-link v-if="item" :to="item.path">{{ item.name }}</router-link>
    </template>
  </Menubar>
  <router-view/>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar';
import { ref } from 'vue';
import useUserStore from '@/stores/userStore';

const user = useUserStore();

const items = ref([
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Campaigns',
    path: '/campaigns',
  },
  user.isAdmin && {
    name: 'Admin Panel',
    path: '/admin',
  },
]);
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
