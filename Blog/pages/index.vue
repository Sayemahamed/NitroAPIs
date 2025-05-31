<script setup lang="ts">
const { data, error, status } = await useFetch('/api/posts', { lazy: true })
</script>
<template>
  <h1>Home Page</h1>
  <ul>
    <li v-for="post in data" class="post-item mb-4 rounded border p-4 shadow-sm">
      <NuxtLink
        :to="{ name: 'posts-id', params: { id: post.id } }"
        class="mb-2 text-xl font-bold"
        >{{ post.title }}</NuxtLink
      >
      <p class="mb-2 text-gray-700">{{ post.content }}</p>
      <NuxtLink
        :to="{ name: 'users-id', params: { id: post.author.id } }"
        class="text-sm text-gray-500"
        >By {{ post.author.name }}</NuxtLink
      >
    </li>
  </ul>
</template>
