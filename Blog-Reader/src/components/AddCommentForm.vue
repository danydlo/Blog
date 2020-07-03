<template>
  <form class="add-comment" @submit.prevent="submit">
    <h3>Add a Comment</h3>
    <input v-model="name" type="text" placeholder="Cool Name" required />
    <textarea v-model="text" placeholder="Comment..." required />
    <button>Submit</button>
    <button @click.prevent="close">Close</button>
  </form>
</template>

<script>
export default {
  name: 'AddCommentForm',
  props: ['post'],
  data() {
    return {
      name: null,
      text: null
    }
  },
  methods: {
    async postData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      return response.json()
    },
    submit() {
      this.$Progress.start()
      this.postData('http://localhost:3000/comments/create', {
        user: this.name,
        text: this.text,
        post: this.post
      })
        .then(data => {
          this.$Progress.finish()
          this.$emit('submitComment', data)
          this.clearForm()
        })
        .catch(err => {
          this.$Progress.fail()
          console.log(err)
        })
    },
    clearForm() {
      this.name = null
      this.text = null
    },
    close() {
      this.$emit('closeForm')
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
  text-align: left;
  padding: 15px;
  border-radius: 15px;
  border: 2px solid #0088a9;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.06);
}

h3,
button {
  font-family: Roboto, sans-serif;
}

textarea {
  resize: vertical;
  height: 150px;
}

textarea:focus,
input:focus,
button:focus {
  outline: none;
}

button {
  margin: 5px 5px;
}

input[type='text'] {
  padding: 10px;
  margin: 10px 0;
}

.add-comment {
  width: 35%;
  margin-top: 35px;
}
</style>
