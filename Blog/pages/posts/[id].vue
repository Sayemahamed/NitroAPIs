<script setup lang="ts">
const { data } = await useFetch(`/api/posts/${useRoute().params.id}`, { lazy: true })
</script>
<template>
  <div class="mx-auto max-w-3xl px-4 py-8">
    <h1 class="mb-4 text-2xl font-bold">{{ data?.title }}</h1>
    <p class="mb-2 text-gray-700">
      <span class="font-semibold">Author:</span> {{ data?.author.name }}
      <span class="font-semibold">Email:</span> {{ data?.author.email }}
    </p>
    <p class="mb-2 text-gray-700">
      <span class="font-semibold">Created At:</span>
      {{ new Date(data?.created_at).toLocaleString() }}
    </p>
    <p class="text-gray-700 whitespace-pre-wrap">{{ data?.content }}</p>
  </div>
</template>

