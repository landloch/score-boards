import PandaRoyaleView from '@/views/PandaRoyaleView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bg-selection',
      component: PandaRoyaleView
    },
    {
      path: '/panda-royale',
      name: 'panda-royale',
      component: PandaRoyaleView
    },
  ],
})

export default router
