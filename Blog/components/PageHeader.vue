<template>
  <div class="mb-10">
    <h1 class="text-3xl font-bold mb-2">
      <slot name="title"></slot>
    </h1>
    <p v-if="$slots.subtitle" class="text-gray-500">
      <slot name="subtitle"></slot>
    </p>
  </div>
</template>

<script setup lang="ts">
// No script logic needed for now
</script>
