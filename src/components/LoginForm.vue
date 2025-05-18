<script setup lang="ts">
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Message from 'primevue/message';
import Button from 'primevue/button';
import { Form } from '@primevue/forms';
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from 'primevue/usetoast';
import { z } from 'zod';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';

const toast = useToast();
const router = useRouter();
const userStore = useUserStore();

const initialValues = ref({
  username: '',
  password: '',
});

const resolver = ref(zodResolver(
  z.object({
    username: z.string().min(1, { message: 'Username is required.' }),
    password: z.string().min(1, { message: 'Password is required.' }),
  }),
));

const onFormSubmit = ({ valid, values }) => {
  if (valid) {
    const result = userStore.login({
      username: values.username,
      password: values.password,
    });

    if (result.success) {
      toast.add({
        severity: 'success',
        summary: 'Successfully logged in.',
        life: 2000,
      });
      router.push('/');
    } else {
      toast.add({
        severity: 'error',
        summary: 'Login failed',
        detail: result.message,
        life: 2000,
      });
    }
  }
};
</script>

<template>
  <div class="login-form">
    <Card class="login-form__card">
      <template #title>
        <span class="login-form__title">
          Login
        </span>
        <div class="login-form__hint">
          <p>For demo purposes, you can use:</p>
          <ul>
            <li>Username: user, Password: 1234</li>
            <li>Username: admin, Password: 5678</li>
          </ul>
        </div>
      </template>
      <template #content>
        <Form
          v-slot="$form"
          :resolver="resolver"
          :initialValues="initialValues"
          :validateOnBlur="true"
          @submit="onFormSubmit"
          class="login-form__form"
        >
          <div class="login-form__row">
            <label for="username">Username</label>
            <InputText id="username" name="username" type="text" placeholder="Username"/>
            <Message
              v-if="$form.username?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.username.error?.message }}
            </Message>
          </div>
          <div class="login-form__row">
            <label for="password">Password</label>
            <Password
              id="password"
              name="password"
              v-model="initialValues.password"
              toggleMask
              :feedback="false"
            />
            <Message
              v-if="$form.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.password.error?.message }}
            </Message>
          </div>
          <Button type="submit" severity="primary" label="Log in"/>
        </Form>
      </template>
    </Card>
  </div>
</template>

<style lang="scss">
.login-form {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__card {
    width: 100%;
    max-width: 500px;
    height: 100%;
    max-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    width: 300px;
  }

  &__row {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  &__hint {
    margin: 16px 0;
    font-size: 0.85rem;
    color: #666;
    p {
      margin-bottom: 4px;
    }
    ul {
      padding-left: 16px;
    }
  }

  .p-password-input {
    width: 100%;
  }
}
</style>
