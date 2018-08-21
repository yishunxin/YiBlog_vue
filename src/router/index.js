import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import blogs from '@/components/Blogs'
import BlogWrite from '@/components/BlogWrite'
import albums from '@/components/albums'
import photos from '@/components/photos'
import home from '@/components/home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/main/home'
    },
    {
      path: '/main',
      component: Main,
      props: true,
      children: [
        {
          path: 'home',
          component: home
        },
        {
          path: 'blogs',
          component: blogs
        },
        {
          path: 'albums',
          component: albums,
        },
        {
          path: 'photos',
          component: photos
        }
      ]
    },
    {
      path: '/blogwrite',
      component: BlogWrite
    }
  ]
})
