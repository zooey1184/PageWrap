import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/PageWrap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
  ]
})
