import { createRouter, createWebHistory } from "vue-router";
import TheRegister from "../pages/TheRegister.vue"
import TheAuth from '../pages/TheAuth.vue'
import TheBoard from "../pages/TheBoard.vue"
import TheTasks from "../pages/TheTasks.vue"


const routes = [
  {
    path: '/',
    name: 'register',
    component: TheRegister
  },
  {
    path: '/auth',
    name: 'auth',
    component: TheAuth
  },
  {
    path: '/auth/board',
    name: 'board',
    component: TheBoard
  },
  {
    path: `/auth/board/:id`,
    name: ':id',
    component: TheTasks
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router;