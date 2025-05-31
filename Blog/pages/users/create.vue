<script setup lang="ts">
const onSubmit = () => {
  $fetch('/api/users', {
    method: 'POST',
    body: {
      name: name.value,
      email: email.value,
      password_hash: password.value,
    },
  })
}
const password = ref('')
const name = ref('')
const email = ref('')
</script>
<template>
  <h1>Create User</h1>
  <form @submit.prevent="onSubmit" class="space-y-4 rounded-lg bg-white p-4 shadow-md">
    <div class="flex flex-col">
      <label for="name" class="mb-1 font-medium">Name</label>
      <input
        type="text"
        id="name"
        v-model="name"
        class="rounded border border-gray-300 px-3 py-2"
        placeholder="Enter name"
      />
    </div>
    <div class="flex flex-col">
      <label for="email" class="mb-1 font-medium">Email</label>
      <input
        type="email"
        id="email"
        v-model="email"
        class="rounded border border-gray-300 px-3 py-2"
        placeholder="Enter email"
      />
    </div>
    <div class="flex flex-col">
      <label for="password" class="mb-1 font-medium">Password</label>
      <input
        type="password"
        id="password"
        v-model="password"
        class="rounded border border-gray-300 px-3 py-2"
        placeholder="Enter password"
      />
    </div>
    <button
      type="submit"
      class="mt-4 w-full rounded bg-blue-500 py-2 font-bold text-white hover:bg-blue-600"
    >
      Create
    </button>
  </form>
</template>
