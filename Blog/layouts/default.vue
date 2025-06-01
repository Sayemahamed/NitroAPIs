<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navigation -->
    <header class="border-b">
      <nav class="max-w-4xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-xl font-semibold hover:text-blue-600 transition-colors">
            Blog
          </NuxtLink>
          <div class="flex items-center space-x-6">
            <NuxtLink 
              to="/" 
              class="hover:text-blue-600 transition-colors"
              active-class="text-blue-600"
            >
              Home
            </NuxtLink>
            <NuxtLink 
              to="/users" 
              class="hover:text-blue-600 transition-colors"
              active-class="text-blue-600"
            >
              Users
            </NuxtLink>
            <NuxtLink 
              to="/posts/new" 
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              New Post
            </NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <div class="max-w-4xl mx-auto px-4 py-8">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t py-6">
      <div class="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
        &copy; 2025 Blog. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// This is a layout component
</script>
