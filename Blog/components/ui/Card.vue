<template>
  <div 
    class="border rounded-lg overflow-hidden hover:border-blue-200 transition-colors"
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
