<script setup lang="ts">
const { data: tasks } = await useFetch("/api/tasks", { lazy: true });
</script>
<template>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      {{ task.title }}
      {{ task.description }}
      {{ task.complete }}
    </li>
  </ul>
</template>
