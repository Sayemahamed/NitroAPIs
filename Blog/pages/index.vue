<template>
  <div>
    <PageHeader>
      <template #title>Latest Posts</template>
      <template #subtitle>Discover our latest articles and updates</template>
    </PageHeader>

    <div v-if="pending" class="space-y-4">
      <Card v-for="i in 3" :key="i">
        <div class="space-y-3">
          <Skeleton width="40%" />
          <Skeleton width="70%" />
          <Skeleton width="100%" />
        </div>
      </Card>
    </div>

    <div v-else-if="error" class="p-4 text-red-600 bg-red-50 rounded-lg">
      Failed to load posts. Please try again later.
    </div>

    <div v-else class="space-y-4">
      <Card v-for="post in posts" :key="post.id" :to="`/posts/${post.id}`">
        <div class="space-y-2">
          <div class="flex justify-between items-start">
            <h2 class="text-xl font-semibold hover:text-blue-600 transition-colors">
              {{ post.title }}
            </h2>
            <span class="text-sm text-gray-500 whitespace-nowrap ml-4">
              {{ formatDate(post.updated_at) }}
            </span>
          </div>
          <p class="text-gray-600 line-clamp-2">
            {{ post.content || 'No content available' }}
          </p>
          <div class="pt-2">
            <NuxtLink 
              :to="`/posts/${post.id}`" 
              class="inline-flex items-center text-blue-600 hover:underline text-sm"
            >
              Read more
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </Card>

      <Card v-if="posts.length === 0">
        <p class="text-center text-gray-500 py-8">No posts found.</p>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: posts, pending, error } = await useFetch('/api/posts')

const formatDate = (dateString: string) => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(dateString));
  } catch (e) {
    return '';
  }
}
</script>
