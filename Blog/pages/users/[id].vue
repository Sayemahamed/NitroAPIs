<script setup lang="ts">
const route = useRoute()
const { data, error } = await useFetch(`/api/users/${route.params.id}`, {
  lazy: true,
})
</script>
<template>
  <NuxtLink :to="{ name: 'users-profile', params: { id: route.params.id } }">Profile</NuxtLink>
  <div class="container mx-auto px-4 py-8">
    <div v-if="error" class="text-center font-bold text-red-500">
      {{ error.message }}
    </div>
    <div v-else class="rounded-lg bg-white p-6 shadow-md">
      <h1 class="mb-4 text-2xl font-bold">{{ data?.name }}</h1>
      <p class="mb-2 text-gray-700"><span class="font-semibold">Email:</span> {{ data?.email }}</p>
      <p class="mb-2 text-gray-700">
        <span class="font-semibold">Created At:</span>
        {{ new Date(data?.created_at).toLocaleString() }}
      </p>
      <p class="text-gray-700">
        <span class="font-semibold">Updated At:</span>
        {{ new Date(data?.updated_at).toLocaleString() }}
      </p>
    </div>
  </div>
</template>
