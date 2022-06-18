import { createRouter, createWebHistory } from 'vue-router'
import LoginMain from '../views/Login.vue'
import Cpanel from '../views/Dashbord.vue'
import Add from '../components/Add.vue'
import edit from "../components/Edit.vue";
import logins from "../views/Login.vue";
const routes = [
  {
    path: '/',
    name: 'Cpanel',
    component: Cpanel
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginMain
  },
  {
    path: '/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/logins',
    name: 'logins',
    component: logins
  },
  {
    path: '/update/:id',
    name: 'edit',
    component: edit
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
