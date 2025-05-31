<template>
  <div 
    class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
    :class="{ 'cursor-pointer': to }"
  >
    <NuxtLink v-if="to" :to="to" class="block h-full">
      <div class="p-6">
        <slot></slot>
      </div>
    </NuxtLink>
    <div v-else class="p-6">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  to: {
    type: String,
    default: ''
  }
})
</script>
