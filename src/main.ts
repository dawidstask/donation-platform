import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { createPinia } from 'pinia';
import ToastService from 'primevue/toastservice';
import App from './App.vue';
import router from './router';

const pinia = createPinia();
const app = createApp(App);
app.use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .use(pinia)
  .use(ToastService)
  .mount('#app');
