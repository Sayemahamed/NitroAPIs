<template>
  <header>
    <nav class="bg-gray-800 py-4">
      <div class="container mx-auto px-4">
        <div class="flex justify-between">
          <div class="items-center flex">
            <NuxtLink to="/" class="text-white text-2xl font-bold"
              >ToDo</NuxtLink
            >
          </div>
          <div class="flex items-center">
            <NuxtLink to="create" class="text-white text-base font-medium mr-4"
              >create</NuxtLink
            >
          </div>
        </div>
      </div>
    </nav>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer></footer>
</template>
