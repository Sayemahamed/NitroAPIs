<script setup lang="ts">
const { data: tasks } = await useFetch('/api/tasks', { lazy: true })
</script>
<template>
  <ul class="space-y-4">
    <li v-for="task in tasks" :key="task.id" class="flex items-center justify-between">
      <div class="flex items-center">
        <svg
          v-if="task.complete"
          class="h-6 w-6 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <p class="ml-4 text-lg font-medium">{{ task.title }}</p>
      </div>
      <NuxtLink
        :to="{ name: 'task-id', params: { id: task.id } }"
        class="text-blue-600 hover:underline"
        >View</NuxtLink
      >
    </li>
  </ul>
</template>
