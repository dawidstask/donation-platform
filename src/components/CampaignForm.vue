<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import Button from 'primevue/button';
import Message from 'primevue/message';
import { useToast } from 'primevue/usetoast';
import { useCampaignStore } from '@/stores/useCampaignStore';

const campaignStore = useCampaignStore();
const toast = useToast();

const categories = [
  'Water',
  'Environment',
  'Education',
  'Food',
  'Health',
  'Emergency',
];

const schema = toTypedSchema(z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Please select a category'),
  image: z.string().url('Please enter a valid URL'),
  amount: z.number().min(0, 'Amount must be greater than 0'),
}));

const {
  handleSubmit,
  errors,
  defineField,
} = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    description: '',
    category: '',
    image: '',
    amount: 0,
  },
});

const [title, titleAttrs] = defineField('title');
const [description, descriptionAttrs] = defineField('description');
const [category, categoryAttrs] = defineField('category');
const [image, imageAttrs] = defineField('image');
const [amount, {}] = defineField('amount');

const loading = ref(false);
const resetForm = () => {
  title.value = '';
  description.value = '';
  category.value = '';
  image.value = '';
  amount.value = 0;
};

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    campaignStore.addCampaign({
      ...values,
    });
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Campaign created successfully',
      life: 3000,
    });
    resetForm();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to create campaign',
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <form @submit="onSubmit" class="campaign-form">
    <div class="campaign-form__field">
      <label for="title" class="campaign-form__label">Title</label>
      <InputText
        id="title"
        v-model="title"
        v-bind="titleAttrs"
        :class="{ 'p-invalid': errors.title }"
        class="campaign-form__input"
      />
      <Message
        v-if="errors.title"
        severity="error"
        size="small"
        variant="simple"
      >
        {{ errors.title }}
      </Message>
    </div>

    <div class="campaign-form__field">
      <label for="description" class="campaign-form__label">Description</label>
      <Textarea
        id="description"
        v-model="description"
        v-bind="descriptionAttrs"
        :class="{ 'p-invalid': errors.description }"
        class="campaign-form__input"
        rows="3"
        autoResize
      />
      <Message
        v-if="errors.description"
        severity="error"
        size="small"
        variant="simple"
      >
        {{ errors.description }}
      </Message>
    </div>

    <div class="campaign-form__field">
      <label for="category" class="campaign-form__label">Category</label>
      <Select
        id="category"
        v-model="category"
        v-bind="categoryAttrs"
        :options="categories"
        :class="{ 'p-invalid': errors.category }"
        class="campaign-form__input"
        placeholder="Select a category"
      />
      <Message
        v-if="errors.category"
        severity="error"
        size="small"
        variant="simple"
      >
        {{ errors.category }}
      </Message>
    </div>

    <div class="campaign-form__field">
      <label for="image" class="campaign-form__label">Image URL</label>
      <InputText
        id="image"
        v-model="image"
        v-bind="imageAttrs"
        :class="{ 'p-invalid': errors.image }"
        class="campaign-form__input"
      />
      <Message
        v-if="errors.image"
        severity="error"
        size="small"
        variant="simple"
      >
        {{ errors.image }}
      </Message>
    </div>

    <div class="campaign-form__actions">
      <Button
        type="submit"
        label="Create Campaign"
        :loading="loading"
        class="campaign-form__submit"
      />
    </div>
  </form>
</template>

<style scoped lang="scss">
.campaign-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__label {
    font-weight: 500;
  }

  &__input {
    width: 100%;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
  }

  &__submit {
    min-width: 200px;
  }
}
</style>
