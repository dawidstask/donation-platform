import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    isAdmin: false,
    name: '',
  }),
});

export default useUserStore;
