<script setup lang="ts">
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="not-found">
    <Card class="not-found__card">
      <template #title>
        404 - Page Not Found
      </template>
      <template #content>
        <p>The page you are looking for does not exist.</p>
        <Button label="Go Home" @click="goHome" />
      </template>
    </Card>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.not-found__card {
  text-align: center;
  padding: 2rem;
  max-width: 500px;
}
</style>
