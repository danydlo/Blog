<template>
  <div id="app">
    <Navbar />
    <transition name="fade" mode="out-in">
      <router-view :blogs="blogs" />
    </transition>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  components: { Navbar },
  data() {
    return {
      blogs: []
    }
  },
  beforeCreate() {
    this.$Progress.start()
    fetch('http://localhost:3000/posts', { mode: 'cors' })
      .then(response => response.json())
      .then(data => {
        this.$Progress.finish()
        this.blogs = [...data]
      })
      .catch(err => {
        this.$Progress.fail()
        console.log(err)
      })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-color: #fff;
  text-align: center;
}

li,
a,
button {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #edf0f1;
  text-decoration: none;
}

button {
  margin-top: 10px;
  padding: 9px 25px;
  background-color: rgba(0, 136, 169, 1);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

button:hover {
  background-color: rgba(0, 136, 169, 0.8);
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-leave-to {
  opacity: 0;
}

.slide-leave-active,
.slide-enter-active {
  transition: 0.5s;
}
.slide-enter {
  transform: translate(0, 50%);
}
.slide-leave-to {
  opacity: 0;
}
</style>
