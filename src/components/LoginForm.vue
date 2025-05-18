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

const toast = useToast();
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

const onFormSubmit = ({ valid }) => {
  // TODO: validate
  if (valid) {
    toast.add({ severity: 'success', summary: 'Successfully logged in.', life: 3000 });
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
    max-height: 400px;
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

  .p-card-body {
    gap: 50px
  }
  .p-password-input {
    width: 100%;
  }
}
</style>
