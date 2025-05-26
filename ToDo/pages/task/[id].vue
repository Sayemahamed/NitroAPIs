<script setup lang="ts">
const route = useRoute()
import { ref, watch } from 'vue'

const {
  data: task,
  error,
  status,
  refresh,
} = useFetch(`/api/tasks/${route.params.id}`, { lazy: true })

const title = ref('')
const description = ref('')
const complete = ref(false)

watch(
  task,
  (newTask) => {
    title.value = newTask?.title ?? ''
    description.value = newTask?.description ?? ''
    complete.value = newTask?.complete ?? false
  },
  { immediate: true },
)

const onSubmit = async () => {
  try {
    await $fetch(`/api/tasks/${route.params.id}`, {
      method: 'PATCH',
      body: {
        title: title.value,
        description: description.value,
        complete: complete.value,
      },
    })
    alert('Task updated successfully')
    refresh()
  } catch (error) {
    alert('An error occurred while updating the task')
  }
}
const deleteTask = async () => {
  try {
    await $fetch(`/api/tasks/${route.params.id}`, {
      method: 'DELETE',
    })
    alert('Task deleted successfully')
    navigateTo('/')
  } catch (error) {
    alert('An error occurred while deleting the task')
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 v-if="error" class="my-4 text-center text-xl font-bold text-red-500">
      {{ error.message }}
    </h1>
    <h1 v-else-if="status === 404" class="my-4 text-center text-xl font-bold text-gray-500">
      Task not found
    </h1>
    <div v-else-if="task" class="rounded-lg bg-white p-6 shadow-md">
      <form @submit.prevent="onSubmit">
        <h1 class="mb-4 text-2xl font-bold">{{ task.title }}</h1>
        <p class="mb-2 text-gray-700">{{ task.description }}</p>
        <p class="mb-2">
          <span class="font-semibold">Completed:</span> {{ task.complete ? 'Yes' : 'No' }}
        </p>
        <p class="mb-2">
          <span class="font-semibold">Created At:</span>
          {{ new Date(task.created_at).toLocaleString() }}
        </p>
        <p>
          <span class="font-semibold">Updated At:</span>
          {{ new Date(task.updated_at).toLocaleString() }}
        </p>
        <div class="flex items-center">
          <label class="mr-2" for="complete">Complete:</label>
          <input id="complete" v-model="complete" type="checkbox" class="h-4 w-4" />
        </div>
        <div class="mt-4">
          <label class="mr-2" for="title">Title:</label>
          <input id="title" v-model="title" type="text" class="border border-gray-300 px-2 py-1" />
        </div>
        <div class="mt-4">
          <label class="mr-2" for="description">Description:</label>
          <textarea
            id="description"
            v-model="description"
            class="border border-gray-300 px-2 py-1"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          class="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Update Task
        </button>
        <button
          @click="deleteTask"
          class="ml-4 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          Delete Task
        </button>
      </form>
    </div>
  </div>
</template>
