<template>
  <form class="update-post" @submit.prevent="submit">
    <h1>Update Post</h1>
    <hr />
    <label>Title</label>
    <input v-model="postTitle" type="text" required />
    <label>Text</label>
    <textarea v-model="postText" required />
    <label>{{ postPublish ? 'Publish' : "Don't Publish" }}</label>
    <input v-model="postPublish" type="checkbox" />
    <div>
      <button>Update</button>
      <button @click="editPost">Cancel</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'UpdatePostForm',
  props: ['title', 'text', 'publish', 'id'],
  data() {
    return {
      postTitle: this.$props.title,
      postText: this.$props.text,
      postPublish: false
    }
  },
  methods: {
    async putData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(data)
      })

      return response.json()
    },
    submit() {
      // update the post
      this.$Progress.start()
      this.putData(`http://localhost:3000/posts/create/update/${this.id}`, {
        title: this.postTitle,
        text: this.postText,
        publish: this.postPublish
      })
        .then(() => {
          this.$Progress.finish()
          this.$emit('updatePost')
          this.editPost()
        })
        .catch(err => {
          this.$Progress.fail()
          console.log(err)
        })
    },
    editPost() {
      this.$emit('editPost')
    }
  }
}
</script>

<style scoped>
input,
textarea {
  font-family: Roboto, sans-serif;
  font-size: inherit;
  width: 100%;
  text-align: center;
  padding: 15px;
  margin: 10px 0;
  border-radius: 15px;
  border: 2px solid #0088a9;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.06);
}

h1,
button,
label {
  font-family: Roboto, sans-serif;
}

h1 {
  font-size: 35px;
  padding-bottom: 20px;
}

textarea {
  resize: vertical;
  height: 300px;
}

textarea:focus,
input:focus,
button:focus {
  outline: none;
}

input[type='checkbox'] {
  box-shadow: none;
}

button {
  margin: 10px 5px;
}

hr {
  width: 50%;
  opacity: 0.8;
  margin: 10px auto;
}

.update-post {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
}

form {
  width: 50%;
  margin-top: 0;
}
</style>
