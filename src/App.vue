<template>
  <Toast />
  <Menubar v-if="userStore.isAuthenticated" :model="items">
    <template #item="{ item }">
      <RouterLink v-if="item.path" :to="item.path" class="menu__link">{{ item.name }}</RouterLink>
    </template>
    <template #end>
      <Button @click="handleLogout" label="Logout" text />
    </template>
  </Menubar>
  <router-view/>
</template>

<script setup lang="ts">
import { Toast } from 'primevue';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';

const router = useRouter();
const userStore = useUserStore();

const handleLogout = () => {
  userStore.logout();
  router.push('/login');
};

const items = computed(() => [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Campaigns',
    path: '/campaigns',
  },
  userStore.isAdmin && {
    name: 'Admin Panel',
    path: '/admin',
  },
].filter(Boolean));
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.menu__link {
  margin-right: 10px;
  text-decoration: none;
}
.p-menubar-mobile {
  .p-menubar-item-content {
    height: 50px;
    display: flex;
    align-items: center;
    .menu__link {
      margin-left: 10px;
    }
  }
}
</style>
