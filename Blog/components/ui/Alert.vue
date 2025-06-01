<template>
  <div 
    class="p-4 rounded-lg mb-6 text-sm" 
    :class="{
      'bg-red-50 text-red-700': type === 'error',
      'bg-yellow-50 text-yellow-700': type === 'warning',
      'bg-green-50 text-green-700': type === 'success',
      'bg-blue-50 text-blue-700': type === 'info'
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type AlertType = 'error' | 'warning' | 'success' | 'info'

defineProps<{
  type?: AlertType
}>()
</script>
</script>
