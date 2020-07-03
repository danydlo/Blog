<template>
  <div class="nav">
    <h1>Games and Films</h1>
    <nav>
      <ul class="nav-links" v-if="loggedIn">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/create">Create</router-link></li>
      </ul>
    </nav>
    <button @click="clickBtn">{{ text }}</button>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['loggedIn'],
  methods: {
    clickBtn() {
      if (this.loggedIn) {
        localStorage.removeItem('token')
        localStorage.removeItem('user-email')
        this.$emit('logout')
      }
      this.$router.push('/login')
    }
  },
  computed: {
    text() {
      return this.loggedIn ? 'Logout' : 'Login'
    }
  }
}
</script>

<style scoped>
h1 {
  color: #0088a9;
  background-color: #24252a;
  font-family: 'Indie Flower', sans-serif;
}

button:focus {
  outline: none;
}

nav {
  background-color: #24252a;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 10%;
  background-color: #24252a;
}

.nav-links {
  list-style: none;
  margin-right: 130px;
}

.nav-links li {
  display: inline-block;
  padding: 0 20px;
  background-color: #24252a;
}

.nav-links li a {
  transition: all 0.3s ease 0s;
  background-color: #24252a;
}

.nav-links li a:hover {
  color: #0088a9;
}
</style>
