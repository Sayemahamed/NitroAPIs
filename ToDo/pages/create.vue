<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const title = ref("");
const description = ref("");

const onSubmit = async () => {
  if (title.value.trim().length === 0) {
    alert("Title is required");
    return;
  }

  try {
    await $fetch("/api/tasks", {
      method: "POST",
      body: {
        title: title.value,
        description: description.value,
      },
    });
    alert("Task created successfully");
    router.push("/");
  } catch (error) {
    alert("An error occurred while creating the task");
  }
};
</script>
<template>
  <div class="form-container">
    <h1>Add Tasks</h1>
    <form @submit.prevent="onSubmit" class="task-form">
      <div class="form-group">
        <label for="title">Title</label>
        <input 
          type="text" 
          id="title" 
          v-model="title" 
          placeholder="Enter task title" 
          required 
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea 
          id="description" 
          v-model="description" 
          placeholder="Enter task description" 
          class="form-control"
          rows="4"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>
