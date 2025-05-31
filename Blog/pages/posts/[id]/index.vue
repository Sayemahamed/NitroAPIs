<template>
  <div>
    <div v-if="pending" class="space-y-6">
      <div class="h-8 bg-gray-200 rounded w-3/4 max-w-2xl"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2 max-w-xs mb-8"></div>
      <div class="space-y-4">
        <div v-for="i in 5" :key="i" class="h-4 bg-gray-100 rounded w-full"></div>
      </div>
    </div>

    <div v-else-if="error" class="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">
            Failed to load post. It may have been removed or you may not have permission to view it.
          </p>
        </div>
      </div>
    </div>

    <div v-else-if="post" class="prose max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ post.title }}</h1>
        <div class="flex items-center text-sm text-gray-500">
          <span>Updated {{ formatDate(post.updated_at) }}</span>
          <span class="mx-2">•</span>
          <span v-if="post.author">By {{ post.author.name || post.author.email }}</span>
        </div>
      </div>

      <div class="prose prose-lg max-w-none text-gray-700">
        <p class="whitespace-pre-line">{{ post.content }}</p>
      </div>

      <div class="mt-12 pt-6 border-t border-gray-200">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg class="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to all posts
        </NuxtLink>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-500">Post not found.</p>
      <NuxtLink to="/" class="mt-4 inline-block text-blue-600 hover:underline">
        Go back home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: post, pending, error } = await useFetch(`/api/posts/${route.params.id}`)

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

<style>
.prose {
  color: #374151;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: #111827;
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 1em;
  margin-top: 1.5em;
}

.prose p,
.prose ul,
.prose ol {
  margin-bottom: 1.25em;
  line-height: 1.7;
}

.prose a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.prose a:hover {
  text-decoration: underline;
}
</style>
