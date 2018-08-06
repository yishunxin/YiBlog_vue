import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import blogs from '@/components/Blogs'
import BlogWrite from '@/components/BlogWrite'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/main'
    },
    {
      path: '/main',
      component: Main,
      props: true,
      children: [
        {
          path: 'blogs',
          component: blogs
        }
      ]
    },
    {
      path: '/blogwrite',
      component: BlogWrite
    }
  ]
})
