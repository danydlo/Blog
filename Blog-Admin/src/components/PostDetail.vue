<template>
  <div class="post">
    <h1>{{ title }}</h1>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'PostDetail',
  props: ['title', 'text']
}
</script>

<style scoped>
h1,
p {
  font-family: Roboto, sans-serif;
}

h1 {
  font-size: 35px;
  padding-bottom: 20px;
}

p {
  text-align: left;
}

.post {
  width: 50%;
}
</style>
