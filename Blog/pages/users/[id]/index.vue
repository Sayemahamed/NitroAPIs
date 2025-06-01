<template>
  <div>
    <div v-if="pending" class="space-y-4">
      <Card>
        <div class="flex items-center space-x-4">
          <Skeleton class="h-16 w-16 rounded-full" />
          <div class="space-y-2 flex-1">
            <Skeleton width="75%" />
            <Skeleton width="50%" />
            <Skeleton width="40%" />
          </div>
        </div>
      </Card>
    </div>

    <div v-else-if="error" class="p-4 bg-red-50 text-red-700 rounded-lg mb-6">
      Failed to load user. Please try again later.
    </div>

    <div v-else-if="user" class="space-y-6">
      <!-- User Profile -->
      <Card>
        <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
          <div class="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xl font-semibold flex-shrink-0">
            {{ user.name ? user.name.charAt(0).toUpperCase() : 'U' }}
          </div>
          <div class="space-y-1">
            <h2 class="text-2xl font-bold">
              {{ user.name || 'Anonymous User' }}
            </h2>
            <p class="text-gray-600">{{ user.email }}</p>
            <p class="text-sm text-gray-500">
              Member since {{ formatDate(user.created_at) }}
            </p>
          </div>
        </div>
      </Card>

      <!-- User's Posts -->
      <div class="space-y-4">
        <PageHeader>
          <template #title>Latest Posts</template>
          <template #subtitle v-if="!postsPending && !postsError">
            {{ posts.length }} {{ posts.length === 1 ? 'post' : 'posts' }} found
          </template>
        </PageHeader>
        
        <div v-if="postsPending" class="space-y-4">
          <Card v-for="i in 3" :key="i">
            <div class="space-y-3">
              <Skeleton width="40%" />
              <Skeleton width="70%" />
              <Skeleton width="100%" />
            </div>
          </Card>
        </div>

        <div v-else-if="postsError" class="p-4 bg-yellow-50 text-yellow-700 rounded-lg">
          Could not load user's posts. Please try again later.
        </div>

        <div v-else class="space-y-3">
          <Card 
            v-for="post in posts" 
            :key="post.id" 
            :to="`/posts/${post.id}`"
            class="hover:border-blue-200"
          >
            <div class="space-y-1">
              <h4 class="font-medium hover:text-blue-600">
                {{ post.title }}
              </h4>
              <p class="text-sm text-gray-500">
                Updated {{ formatDate(post.updated_at) }}
              </p>
            </div>
          </Card>

          <Card v-if="posts.length === 0" class="text-center py-8">
            <p class="text-gray-500">No posts found.</p>
          </Card>
        </div>
      </div>
    </div>

    <Card v-else>
      <div class="text-center py-12">
        <p class="text-gray-500 mb-4">User not found</p>
        <NuxtLink to="/users" class="inline-flex items-center text-blue-600 hover:underline">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to users
        </NuxtLink>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: user, pending, error } = await useFetch(`/api/users/${route.params.id}`)
const { data: posts, pending: postsPending, error: postsError } = await useFetch(`/api/users/${route.params.id}/posts`)

const formatDate = (dateString: string) => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString));
  } catch (e) {
    return '';
  }
}
</script>
