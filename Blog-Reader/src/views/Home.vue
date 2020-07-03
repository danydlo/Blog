<template>
  <div class="posts">
    <div v-for="blog in blogs" :key="blog._id">
      <router-link
        :to="{ name: 'Post-Detail', params: { post_title: blog.title } }"
      >
        <h1>{{ blog.title }}</h1>
        <hr />
        <h3>
          {{ summary(blog.text) }}
        </h3>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blogs'],
  methods: {
    summary(post) {
      const post_summary = post.length > 300 ? post.slice(0, 300) + '...' : post

      return post_summary
    }
  }
}
</script>

<style scoped>
h1,
h3 {
  font-family: Roboto, sans-serif;
  color: black;
}

h1 {
  padding: 20px 0 10px 0;
}

h3 {
  background: #fff;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  line-height: 0;
  padding: 0 1em;
  color: transparent;
}

hr {
  width: 30%;
  opacity: 0.5;
  margin: 0 auto;
}

a:hover > h3 {
  line-height: 1.5;
  padding-top: 10px;
  color: black;
}

.posts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
}

.posts div {
  width: 50%;
}
</style>
