import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import Register from '@/views/Register.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
