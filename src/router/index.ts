import { createRouter, createWebHistory } from 'vue-router'

import layout_default from '@/layouts/default.vue'
import defaultRouter from './defaultRoute'
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: '/',
			redirect: '/console',
			component: () => layout_default,
			children: [
				{
					path: '/console',
					name: 'console',
					component: () => import('@/views/console.vue')
				}
			]
		},
		...defaultRouter
	]
})

export default router