<template>
  <div 
    class="p-4 rounded-md mb-6" 
    :class="{
      'bg-red-50 border-l-4 border-red-400': type === 'error',
      'bg-yellow-50 border-l-4 border-yellow-400': type === 'warning',
      'bg-green-50 border-l-4 border-green-400': type === 'success',
      'bg-blue-50 border-l-4 border-blue-400': type === 'info'
    }"
  >
    <div class="flex">
      <div class="flex-shrink-0">
        <component 
          :is="iconComponent" 
          class="h-5 w-5" 
          :class="{
            'text-red-400': type === 'error',
            'text-yellow-400': type === 'warning',
            'text-green-400': type === 'success',
            'text-blue-400': type === 'info'
          }"
        />
      </div>
      <div class="ml-3">
        <p 
          class="text-sm font-medium"
          :class="{
            'text-red-700': type === 'error',
            'text-yellow-700': type === 'warning',
            'text-green-700': type === 'success',
            'text-blue-700': type === 'info'
          }"
        >
          <slot></slot>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type AlertType = 'error' | 'warning' | 'success' | 'info'

const props = withDefaults(defineProps<{
  type?: AlertType
}>(), {
  type: 'info'
})

const iconComponent = computed(() => {
  switch (props.type) {
    case 'error':
      return 'svg'
    case 'warning':
      return 'svg'
    case 'success':
      return 'svg'
    default:
      return 'svg'
  }
})

const iconPath = computed(() => {
  switch (props.type) {
    case 'error':
      return 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
    case 'warning':
      return 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
    case 'success':
      return 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
    default:
      return 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
  }
})
</script>
