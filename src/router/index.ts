import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import defaultRouter from './defaultRoute'
const modulesRouters: Array<RouteRecordRaw> = [
	{
		path: '/console',
		name: 'console',
		component: () => import('@/views/console/index.vue')
	},
]
const modules: Record<string, any> = import.meta.glob('./modules/**/*.ts', { eager: true })
// 自动导入modules文件下路由
Object.keys(modules).forEach((key) => {
	modules[key].default.forEach((route: RouteRecordRaw) => {
		modulesRouters.push(route)
	});
})

console.log('modulesRouters', modulesRouters)
let routers: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '/',
		redirect: '/console',
		component: () => import('@/layouts/default.vue'),
		children: modulesRouters
	},
	...defaultRouter
]
const router = createRouter({
	history: createWebHistory(),
	routes: routers,
})

export default router