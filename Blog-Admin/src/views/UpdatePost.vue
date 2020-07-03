<template>
  <div class="update-post">
    <transition name="fade" mode="out-in">
      <div class="buttons" v-if="!edit">
        <button @click="editPost">Edit</button>
        <button class="delete" @click="deletePost">Delete</button>
      </div>
    </transition>
    <transition name="slide" mode="out-in">
      <PostDetail :title="title" :text="text" :publish="publish" v-if="!edit" />
      <UpdatePostForm
        :title="title"
        :text="text"
        :id="$route.params.id"
        @editPost="editPost"
        @updatePost="getPost"
        v-else
      />
    </transition>
  </div>
</template>

<script>
import PostDetail from '@/components/PostDetail.vue'
import UpdatePostForm from '@/components/UpdatePostForm.vue'

export default {
  name: 'UpdatePost',
  components: {
    PostDetail,
    UpdatePostForm
  },
  data() {
    return {
      title: '',
      text: '',
      publish: null,
      edit: false
    }
  },
  methods: {
    editPost() {
      this.edit = !this.edit
    },
    deletePost() {
      const confirmDelete = confirm(
        'Are you sure you want to delete this post?'
      )

      this.$Progress.start()
      if (confirmDelete) {
        fetch(
          `http://localhost:3000/posts/create/delete/${this.$route.params.id}`,
          {
            method: 'DELETE',
            headers: {
              'auth-token': localStorage.getItem('token')
            }
          }
        )
          .then(response => response.json())
          .then(data => {
            this.$Progress.finish()
            this.$emit('deletePost', data)
            this.$router.push('/')
          })
          .catch(err => {
            this.$Progress.fail()
            console.log(err)
          })
      }
    },
    getPost() {
      this.$Progress.start()
      fetch(`http://localhost:3000/posts/${this.$route.params.id}`, {
        mode: 'cors'
      })
        .then(response => response.json())
        .then(data => {
          this.$Progress.finish()
          this.title = data.title
          this.text = data.text
          this.publish = data.publish
        })
        .catch(err => {
          this.$Progress.fail()
          console.log(err)
        })
    }
  },
  created() {
    this.getPost()
  }
}
</script>

<style scoped>
button {
  font-family: Roboto, sans-serif;
}

button:focus {
  outline: none;
}

button {
  margin: 10px 5px;
}

.update-post {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
}

.update-post form {
  width: 50%;
  margin-top: 0;
}

.delete {
  background: red;
}
</style>
