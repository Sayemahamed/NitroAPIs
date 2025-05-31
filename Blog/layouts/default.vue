<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navigation -->
    <header class="bg-white shadow-sm">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-800">
              Blog
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-1">
            <NuxtLink 
              to="/" 
              class="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              active-class="bg-gray-100 text-gray-900"
              exact
            >
              Home
            </NuxtLink>
            <NuxtLink 
              to="/users" 
              class="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              active-class="bg-gray-100 text-gray-900"
            >
              Users
            </NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-gray-500 text-sm">
          &copy; 2025 Blog. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// This is a layout component
</script>
