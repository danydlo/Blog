<template>
  <div class="register">
    <form class="register" @submit.prevent="register">
      <h1>Register</h1>
      <hr />
      <transition name="fade">
        <div class="error" v-show="error.isError">{{ error.message }}</div>
      </transition>
      <label>Name</label>
      <input v-model="name" type="text" required />
      <label>Email</label>
      <input v-model="email" type="text" required />
      <label>Password</label>
      <input v-model="password" type="password" required />
      <button>Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      name: null,
      email: null,
      password: null,
      error: {
        isError: false,
        message: 'Invalid Information'
      }
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
    register() {
      this.$Progress.start()
      this.postData('http://localhost:3000/user/register', {
        name: this.name,
        email: this.email,
        password: this.password
      })
        .then(() => {
          this.$Progress.finish()
          this.clearForm()
          this.$router.push('/login')
        })
        .catch(err => {
          this.$Progress.fail()
          if (err) {
            this.error.isError = true
            setTimeout(() => {
              this.error.isError = false
            }, 3000)
          }
        })
    },
    clearForm() {
      this.name = null
      this.email = null
      this.password = null
    }
  }
}
</script>

<style scoped>
input,
input[type='password'] {
  font-family: Roboto, sans-serif;
  font-size: inherit;
  width: 50%;
  text-align: center;
  padding: 15px;
  border-radius: 15px;
  border: 2px solid #0088a9;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.06);
}

h1,
button,
label {
  font-family: Roboto, sans-serif;
}

input:focus,
button:focus {
  outline: none;
}

button {
  margin: 5px 5px;
}

input[type='text'],
input[type='password'] {
  padding: 10px;
  margin: 10px 0;
}

hr {
  width: 50%;
  opacity: 0.8;
  margin: 10px auto;
}

.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
}

.register form {
  width: 50%;
}

.error {
  color: white;
  padding: 10px;
  background-color: #ff4500;
  border-radius: 50px;
  width: 50%;
}
</style>
