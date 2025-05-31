<script>
const route = useRoute()
const { data } = await useFetch(`/api/posts/${route.params.id}`)
</script>
<template>
  <h1>{{ data }}</h1>
</template>
