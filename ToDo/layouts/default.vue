<template>
  <header>
    <nav class="bg-gray-800 py-4">
      <div class="container mx-auto px-4">
        <div class="flex justify-between">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-2xl font-bold text-white">ToDo</NuxtLink>
          </div>
          <div class="flex items-center">
            <NuxtLink :to="{ name: 'create' }" class="mr-4 text-base font-medium text-white"
              >create</NuxtLink
            >
          </div>
        </div>
      </div>
    </nav>
  </header>
  <main class="container mx-auto px-4 py-8">
    <slot></slot>
  </main>
  <footer></footer>
</template>
