<template>
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-2">
      <slot name="title"></slot>
    </h1>
    <p v-if="$slots.subtitle" class="text-gray-600">
      <slot name="subtitle"></slot>
    </p>
  </div>
</template>

<script setup lang="ts">
// No script logic needed for now
</script>
