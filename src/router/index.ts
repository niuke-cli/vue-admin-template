import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { defaultRouter, errorRouter } from './defaultRoute'
import { useUserInfo } from '@/stores/userInfo';
import { menuInfo } from '@/stores/menu';
export const modulesRouters: Array<RouteRecordRaw> = [

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
		children: [
			...modulesRouters
		]
	},
	...defaultRouter
]
const router = createRouter({
	history: createWebHistory(),
	routes: routers,
	strict: true,
	scrollBehavior: () => ({ left: 0, top: 0 }),
})

const registerRouteFresh = ref(true) // 定义标识，记录路由是否添加
router.beforeEach(async (to, from, next) => {
	const userInfo = useUserInfo()
	const useMenu = menuInfo()
	useMenu.nowMenu = to.fullPath
	if (!userInfo.isLogin && to.path !== "/login") {
		next("/login")
	}
	if (registerRouteFresh.value) {
		const routes = await useMenu.getMenuList() || [];
		// 动态添加可访问路由表
		routes.forEach((item) => {
			router.addRoute(item as unknown as RouteRecordRaw);
		});
		errorRouter.forEach(item => {
			router.addRoute(item)
		})
		registerRouteFresh.value = false
		const redirectPath = (from.query.redirect || to.path) as string;
		const redirect = decodeURIComponent(redirectPath);
		const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
		console.log('to', to)
		next(nextData);
	} else {
		next()
	}
})

router.afterEach((to, from, next) => {
	const useMenu = menuInfo()
	useMenu.addTag({
		name: to?.name,
		title: to?.meta.title,
	})
	useMenu.nowTag = to.name as string
})

export default router