<script setup lang="ts">
const route = useRoute()
const { data, error } = await useFetch(`/api/users/${route.params.id}`, { lazy: true })
</script>
<template>
  {{ error }}
  {{ data }}
</template>
