<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Latest Posts</h1>
      <p class="text-gray-600">Discover our latest articles and updates</p>
    </div>

    <div v-if="pending" class="space-y-4">
      <div v-for="i in 3" :key="i" class="bg-white rounded-lg shadow overflow-hidden animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div class="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div class="h-4 bg-gray-100 rounded w-full"></div>
      </div>
    </div>

    <div v-else-if="error" class="bg-red-50 border-l-4 border-red-400 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">
            Failed to load posts. Please try again later.
          </p>
        </div>
      </div>
    </div>

    <div v-else class="space-y-6">
      <article 
        v-for="post in posts" 
        :key="post.id" 
        class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
      >
        <NuxtLink :to="`/posts/${post.id}`" class="block p-6">
          <div class="flex justify-between items-start">
            <h2 class="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
              {{ post.title }}
            </h2>
            <span class="text-sm text-gray-500 whitespace-nowrap ml-4">
              {{ formatDate(post.updated_at) }}
            </span>
          </div>
          <p class="mt-2 text-gray-600 line-clamp-2">
            {{ post.content || 'No content available' }}
          </p>
          <div class="mt-4 flex items-center">
            <span class="text-sm text-blue-600 hover:underline">
              Read more →
            </span>
          </div>
        </NuxtLink>
      </article>

      <div v-if="posts.length === 0" class="text-center py-12">
        <p class="text-gray-500">No posts found.</p>
      </div>
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
