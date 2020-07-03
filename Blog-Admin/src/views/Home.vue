<template>
  <div class="posts">
    <div v-for="blog in blogs" :key="blog._id">
      <router-link :to="{ name: 'Update-Post', params: { id: blog._id } }">
        <h1>{{ blog.title }}</h1>
        <hr />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: ['blogs']
}
</script>

<style scoped>
h1 {
  font-family: Roboto, sans-serif;
  color: black;
}

h1 {
  padding: 20px 0 10px 0;
}

hr {
  width: 30%;
  opacity: 0.5;
  margin: 0 auto;
}

.posts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.posts div {
  width: 50%;
}
</style>
