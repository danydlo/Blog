import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import MakePost from '@/views/MakePost.vue'
import UpdatePost from '@/views/UpdatePost.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    props: true,
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) next({ name: 'Home' })
      else next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) next({ name: 'Home' })
      else next()
    }
  },
  {
    path: '/create',
    name: 'Create-Post',
    component: MakePost,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) next({ name: 'Login' })
      else next()
    }
  },
  {
    path: 'update/:id',
    name: 'Update-Post',
    component: UpdatePost,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) next({ name: 'Login' })
      else next()
    }
  },
  // catch all 404 - define at the very end
  {
    path: '*',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
