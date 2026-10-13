import HarmoniesView from '@/views/HarmoniesView.vue';
import HomeView from '@/views/HomeView.vue';
import NochMalView from '@/views/NochMalView.vue';
import PandaRoyaleView from '@/views/PandaRoyaleView.vue';
import PasswordView from '@/views/PasswordView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bg-selection',
      component: HomeView
    },
    {
      path: '/panda-royale',
      name: 'panda-royale',
      component: PandaRoyaleView
    },
    {
      path: '/noch-mal',
      name: 'noch-mal',
      component: NochMalView
    },
    {
      path: '/harmonies',
      name: 'harmonies',
      component: HarmoniesView
    },
    {
      path: '/password',
      name: 'password',
      component: PasswordView
    }
  ],
})

export default router
