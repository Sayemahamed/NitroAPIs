<template>
  <div 
    class="bg-gray-100 rounded animate-pulse"
    :class="[{
      'w-full': full,
      'h-4': !full,
      'h-full': full
    }, className]"
    :style="{ width }"
  ></div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  full?: boolean
  width?: string
  className?: string
}>(), {
  full: false,
  width: '100%',
  className: ''
})
</script>
