<template>
  <div class="make-post">
    <form class="make-post" @submit.prevent="submit">
      <h1>New Post</h1>
      <hr />
      <label>Title</label>
      <input v-model="title" type="text" required />
      <label>Text</label>
      <textarea v-model="text" required />
      <label>{{ publish ? 'Publish' : "Don't Publish" }}</label>
      <input v-model="publish" type="checkbox" />
      <button>Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MakePost',
  data() {
    return {
      title: null,
      text: null,
      publish: false
    }
  },
  methods: {
    async getAuthor(url = '', data = {}) {
      const author = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(data)
      })

      return author.json()
    },
    async postData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(data)
      })

      return response.json()
    },
    async submit() {
      this.$Progress.start()
      const url = 'http://localhost:3000/posts/create'
      let author = {}

      // get the author first
      const response = await this.getAuthor(`${url}/get`, {
        id: localStorage.getItem('user-id')
      })
        .then(data => {
          author = data
        })
        .catch(err => {
          this.$Progress.fail()
          console.log(err)
        })

      // create the post
      this.postData(url, {
        title: this.title,
        text: this.text,
        author,
        publish: this.publish
      })
        .then(data => {
          this.$Progress.finish()
          this.$emit('submitPost', data)
          this.clearForm()
          this.$router.push('/')
        })
        .catch(err => {
          this.$Progress.fail()
          console.log(err)
        })

      return response
    },
    clearForm() {
      this.title = null
      this.text = null
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

.make-post {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
}

.make-post form {
  width: 50%;
  margin-top: 0;
}
</style>
