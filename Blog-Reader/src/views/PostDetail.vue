<template>
  <div class="post-detail">
    <div class="post">
      <h1>{{ blog.title }}</h1>
      <p>{{ blog.text }}</p>
      <div class="info">
        <p>Author: {{ blog.author.name }}</p>
        <p>Created: {{ blog.createdAt | formatDate }}</p>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="comments" v-for="comment in comments" :key="comment._id">
        <div class="top">
          <h3>{{ comment.user }}</h3>
          <p>{{ comment.createdAt | commentDate }}</p>
        </div>
        <p>{{ comment.text }}</p>
      </div>
    </transition>
    <button @click="showBtn" v-show="!show">Add Comment</button>
    <transition name="slide" mode="out-in">
      <AddCommentForm
        class="hidden"
        :post="blog"
        v-show="show"
        @submitComment="addComment"
        @closeForm="showBtn"
      />
    </transition>
  </div>
</template>

<script>
import AddCommentForm from '@/components/AddCommentForm.vue'
import moment from 'moment'

export default {
  components: { AddCommentForm },
  name: 'PostDetail',
  props: ['blogs'],
  data() {
    return {
      blog: {},
      comments: [],
      show: false
    }
  },
  methods: {
    addComment(comment) {
      this.comments.push(comment)
    },
    showBtn() {
      this.show = !this.show
    }
  },
  beforeMount() {
    let self = this
    this.blog = self.blogs.find(
      blog => blog.title === this.$route.params.post_title
    )
    this.$Progress.start()
    fetch(`http://localhost:3000/comments/${this.blog._id}`, { mode: 'cors' })
      .then(response => response.json())
      .then(data => {
        this.$Progress.finish()
        this.comments = [...data]
      })
      .catch(err => {
        this.$Progress.fail()
        console.log(err)
      })
  },
  filters: {
    formatDate(date) {
      return moment(date).format('MMMM Do YYYY')
    },
    commentDate(date) {
      return moment(date).fromNow()
    }
  }
}
</script>

<style scoped>
h1,
p,
button {
  font-family: Roboto, sans-serif;
}

h1 {
  font-size: 35px;
  padding-bottom: 20px;
}

h3,
p {
  text-align: left;
}

button {
  margin-top: 35px;
}

button:focus {
  outline: none;
}

.post-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
}

.post {
  padding-bottom: 35px;
  border-bottom: 1px solid black;
  width: 50%;
}

.comments {
  padding-bottom: 35px;
  padding-top: 35px;
  border-bottom: 1px solid black;
  width: 50%;
}

.info {
  display: flex;
  justify-content: space-between;
  opacity: 0.6;
  padding-top: 20px;
}

.top {
  display: flex;
  justify-content: space-between;
}
</style>
