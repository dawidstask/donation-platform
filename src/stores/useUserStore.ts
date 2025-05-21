import { defineStore } from 'pinia';
import { useAuth, LoginCredentials } from '@/composables/useAuth';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const isAuthenticated = ref<boolean>(false);
  const isAdmin = ref<boolean>(false);
  const name = ref<string>('');
  const username = ref<string>('');

  const login = (credentials: LoginCredentials) => {
    const result = useAuth(credentials);

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
