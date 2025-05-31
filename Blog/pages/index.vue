<template>
  <div>
    <PageHeader>
      <template #title>Latest Posts</template>
      <template #subtitle>Discover our latest articles and updates</template>
    </PageHeader>

    <div v-if="pending" class="space-y-6">
      <Card v-for="i in 3" :key="i">
        <div class="space-y-3">
          <Skeleton width="33%" />
          <Skeleton width="66%" />
          <Skeleton width="100%" />
        </div>
      </Card>
    </div>

    <Alert v-else-if="error" type="error">
      Failed to load posts. Please try again later.
    </Alert>

    <div v-else class="space-y-6">
      <Card v-for="post in posts" :key="post.id" :to="`/posts/${post.id}`">
        <div class="space-y-3">
          <div class="flex justify-between items-start">
            <h2 class="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
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
            <span class="inline-flex items-center text-sm text-blue-600 hover:underline">
              Read more
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
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
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}
</script>
