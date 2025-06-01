<template>
  <div>
    <PageHeader>
      <template #title>Users</template>
      <template #subtitle>Browse our community of writers</template>
    </PageHeader>

    <div v-if="pending" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card v-for="i in 3" :key="i">
        <div class="space-y-3">
          <Skeleton width="50%" />
          <Skeleton width="75%" />
          <Skeleton width="40%" />
        </div>
      </Card>
    </div>

    <div v-else-if="error" class="p-4 bg-red-50 text-red-700 rounded-lg mb-6">
      Failed to load users. Please try again later.
    </div>

    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card 
        v-for="user in users" 
        :key="user.id" 
        :to="`/users/${user.id}`"
      >
        <div class="space-y-2">
          <h3 class="text-lg font-medium hover:text-blue-600">
            {{ user.name || 'Anonymous' }}
          </h3>
          <p class="text-sm text-gray-500 truncate">
            {{ user.email }}
          </p>
          <div class="pt-2">
            <NuxtLink 
              :to="`/users/${user.id}`"
              class="inline-flex items-center text-blue-600 hover:underline text-sm"
            >
              View profile
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </Card>

      <Card v-if="users.length === 0" class="col-span-full">
        <p class="text-center text-gray-500 py-8">No users found.</p>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: users, pending, error } = await useFetch('/api/users')
</script>
