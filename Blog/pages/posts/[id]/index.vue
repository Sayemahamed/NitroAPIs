<template>
  <div>
    <div v-if="pending" class="space-y-4">
      <Card>
        <div class="space-y-4">
          <Skeleton width="75%" class="h-8" />
          <Skeleton width="40%" class="h-4" />
          <div class="pt-4 space-y-2">
            <Skeleton v-for="i in 5" :key="i" />
          </div>
        </div>
      </Card>
    </div>

    <div v-else-if="error" class="p-4 bg-red-50 text-red-700 rounded-lg mb-6">
      Failed to load post. It may have been removed or you may not have permission to view it.
    </div>

    <div v-else-if="post" class="space-y-6">
      <Card>
        <div class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold mb-3">{{ post.title }}</h1>
            <div class="text-sm text-gray-500">
              <span>Updated {{ formatDate(post.updated_at) }}</span>
              <span v-if="post.author" class="ml-2">•</span>
              <span v-if="post.author" class="ml-2">
                By 
                <NuxtLink 
                  v-if="post.author.id" 
                  :to="`/users/${post.author.id}`"
                  class="text-blue-600 hover:underline"
                >
                  {{ post.author.name || post.author.email }}
                </NuxtLink>
                <span v-else>{{ post.author.name || post.author.email }}</span>
              </span>
            </div>
          </div>

          <div class="prose max-w-none pt-6 border-t">
            <p class="whitespace-pre-line">{{ post.content }}</p>
          </div>

          <div class="pt-6 border-t">
            <NuxtLink 
              to="/" 
              class="inline-flex items-center text-blue-600 hover:underline"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to all posts
            </NuxtLink>
          </div>
        </div>
      </Card>
    </div>

    <Card v-else>
      <div class="text-center py-12">
        <p class="text-gray-500 mb-4">Post not found</p>
        <NuxtLink to="/" class="inline-flex items-center text-blue-600 hover:underline">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Go back home
        </NuxtLink>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string

const { data: post, pending, error } = await useFetch(`/api/posts/${id}`, {
  onResponseError({ response }) {
    if (response.status === 404) {
      showError({ statusCode: 404, statusMessage: 'Post not found' })
    }
  }
})

// Handle 404 errors
if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 500,
    statusMessage: error.value.statusMessage || 'Failed to load post',
    fatal: true
  })
}

function formatDate(dateString: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString))
  } catch (e) {
    return ''
  }
}

// Set the page title
useHead({
  title: post.value ? `${post.value.title} | Blog` : 'Loading...',
  meta: [
    {
      name: 'description',
      content: post.value?.content?.substring(0, 160) || 'Blog post'
    }
  ]
})

// Components are auto-imported in Nuxt 3
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
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.25;
}

.prose p {
  margin-top: 1em;
  margin-bottom: 1em;
  line-height: 1.75;
}

.prose a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.prose a:hover {
  text-decoration: underline;
}

.prose ul,
.prose ol {
  margin-top: 1em;
  margin-bottom: 1em;
  padding-left: 1.5em;
}

.prose li {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.prose code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.875em;
  color: #111827;
  background-color: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
}
</style>
