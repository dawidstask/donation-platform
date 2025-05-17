import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import CampaignsView from '@/views/CampaignsView.vue';
import AdminView from '@/views/AdminView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import useUserStore from '@/stores/userStore';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/campaigns',
    name: 'Campaigns',
    component: CampaignsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: {
      requiresAdmin: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = useUserStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user.isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (!user.isAdmin) {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
