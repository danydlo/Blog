<template>
  <div class="nav">
    <h1>Games and Films</h1>
    <nav>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about-me">About Me</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
h1 {
  color: #0088a9;
  background-color: #24252a;
  font-family: 'Indie Flower', sans-serif;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 10%;
  background-color: #24252a !important;
}

.nav-links {
  list-style: none;
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
