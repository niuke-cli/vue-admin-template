import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import defaultRouter from './defaultRoute'
import { useUserInfo } from '@/stores/userInfo';
import { menuInfo } from '@/stores/menu';
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

// 递归处理树形结构数据函数
const arrayRecursion = (array) => {
	array.forEach((item) => {
		item.name = item.perms;
		item.component = () => import('@/views/demo/index.vue');
		item.meta = {
			title: item.menuName
		}
		if (item.children && item.children.length > 0) {
			arrayRecursion(item.children)
		} else {
			delete item.children
			return
		}
	})
	return array
}

router.beforeEach((to, form, next) => {
	const userInfo = useUserInfo()
	const useMenu = menuInfo()
	if (!userInfo.isLogin && to.path !== "/login") {
		next("/login")
	} else {
		useMenu.getMenuList()
		console.log('routers', routers)
		routers[0].children = arrayRecursion(useMenu.menuList)
		router.addRoute(routers[0])
		console.log('arrayRecursion(useMenu.menuList)',arrayRecursion(useMenu.menuList))
		console.log('router', router.getRoutes())
		// console.log('useMenu.menuList', useMenu.menuList)
		next()
	}
	// console.log('userInfo.isLogin',userInfo.isLogin)
})

export default router