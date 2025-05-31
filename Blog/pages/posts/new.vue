<template>
  <div class="max-w-3xl mx-auto">
    <PageHeader>
      <template #title>Create New Post</template>
      <template #subtitle>Share your thoughts with the world</template>
    </PageHeader>

    <Card>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            :disabled="isSubmitting"
          />
          <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
        </div>

        <div>
          <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            v-model="formData.content"
            rows="8"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            :disabled="isSubmitting"
          ></textarea>
          <p v-if="errors.content" class="mt-1 text-sm text-red-600">{{ errors.content }}</p>
        </div>

        <div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
          <NuxtLink
            to="/"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            :disabled="isSubmitting"
          >
            Cancel
          </NuxtLink>
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            :disabled="isSubmitting"
          >
            <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? 'Publishing...' : 'Publish Post' }}
          </button>
        </div>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface FormData {
  title: string;
  content: string;
  author_id: string; // In a real app, this would come from auth
}

interface FormErrors {
  title?: string;
  content?: string;
  general?: string;
}

const router = useRouter();
const isSubmitting = ref(false);
const formData = ref<FormData>({
  title: '',
  content: '',
  author_id: '1', // Hardcoded for demo - in a real app, get from auth
});

const errors = ref<FormErrors>({});

const validateForm = (): boolean => {
  const newErrors: FormErrors = {};
  
  if (!formData.value.title.trim()) {
    newErrors.title = 'Title is required';
  } else if (formData.value.title.length > 100) {
    newErrors.title = 'Title must be less than 100 characters';
  }
  
  if (!formData.value.content.trim()) {
    newErrors.content = 'Content is required';
  }
  
  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  isSubmitting.value = true;
  errors.value = {};
  
  try {
    const response = await $fetch('/api/posts', {
      method: 'POST',
      body: formData.value,
    });
    
    await router.push(`/posts/${response.id}`);
  } catch (error: any) {
    console.error('Error creating post:', error);
    errors.value.general = error.data?.message || 'Failed to create post. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>
