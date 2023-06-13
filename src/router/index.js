import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddView from '../views/AddView.vue'
import subQuestion from '../views/SubQuesetion.vue'
import feedback from '../views/Feedback.vue'
import staticView  from '../views/Static.vue'
import feedbackPerson   from '../views/feedbackPerson.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Add',
      name: 'add',
      component: AddView
     
    }
    ,
    {
      path: '/subQuestion',
      name: 'subQuestion',
      component: subQuestion 
     
    }
    ,
    {
      path: '/feedback',
      name: 'feedback',
      component: feedback 
     
    } ,
    {
      path: '/feedbackPerson',
      name: 'feedbackPerson',
      component: feedbackPerson 
     
    }
    ,
    {
      path: '/static',
      name: 'static',
      component: staticView 
     
    }
  ]
})

export default router
