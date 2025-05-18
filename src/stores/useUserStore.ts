// import { defineStore } from 'pinia';
// import { authenticate, LoginCredentials } from '@/services/auth';
//
// const useUserStore = defineStore('user', {
//   state: () => ({
//     isAuthenticated: false,
//     isAdmin: false,
//     name: '',
//     username: '',
//   }),
//
//   actions: {
//     login(credentials: LoginCredentials) {
//       const result = authenticate(credentials);
//
//       if (result.success && result.user) {
//         this.isAuthenticated = true;
//         this.isAdmin = result.user.isAdmin;
//         this.name = result.user.name;
//         this.username = result.user.username;
//         return { success: true };
//       }
//
//       return {
//         success: false,
//         message: result.message || 'Login failed',
//       };
//     },
//
//     logout() {
//       this.isAuthenticated = false;
//       this.isAdmin = false;
//       this.name = '';
//       this.username = '';
//     },
//   },
// });
//
// export default useUserStore;

import { defineStore } from 'pinia';
import { authenticate, LoginCredentials } from '@/services/auth';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const isAuthenticated = ref<boolean>(false);
  const isAdmin = ref<boolean>(false);
  const name = ref<string>('');
  const username = ref<string>('');

  const login = (credentials: LoginCredentials) => {
    const result = authenticate(credentials);

    if (result.success && result.user) {
      isAuthenticated.value = true;
      isAdmin.value = result.user.isAdmin;
      name.value = result.user.name;
      username.value = result.user.username;

      return {
        success: true,
      };
    }

    return {
      success: false,
      message: result.message || 'Login failed',
    };
  };

  const logout = () => {
    isAuthenticated.value = false;
    isAdmin.value = false;
    name.value = '';
    username.value = '';
  };

  return {
    login,
    logout,
    isAuthenticated,
    isAdmin,
    name,
  };
});
