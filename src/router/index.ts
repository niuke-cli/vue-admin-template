import { createRouter, createWebHistory } from 'vue-router'

import layout_default from '@/layouts/default.vue'
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: '',
			redirect: '/home',
			component: () => layout_default,
			children: [
				{
					path: '/home',
					name: 'home',
					component: () => import('@/views/home.vue')
				}
			]
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('@/views/login/index.vue')
		},

	]
})

export default router