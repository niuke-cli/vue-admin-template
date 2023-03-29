import { AppRouteRecordRaw } from "@/type/route";
import { constantRouterIcon } from './icon'

const Layout = () => import('@/layouts/default.vue');
const Iframe = () => import('@/views/iframe/index.vue');
const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>();
LayoutMap.set('Layout', Layout);
LayoutMap.set('Iframe', Iframe);
const ParentLayout = () => import('@/layouts/parentLayout.vue');

const routeAllPathToCompMap = import.meta.glob(`@/views/**/*.vue`);
/**
 * 格式化 后端 结构信息并递归生成层级路由表
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const routerGenerator = (routerMap:any, parent?:any): any[] => {
	return routerMap.map((item:any) => {
		let currentRouter: any = {
			// 路由地址 动态拼接生成如 /dashboard/workplace
			path: `${(parent && parent.path) || ''}/${item.path}`,
			// 路由名称，建议唯一
			name: item.key || '',
			// 该路由对应页面的 组件
			component: item.component,
			// label 菜单名称
			label: item.meta.title,
			icon: constantRouterIcon[item.meta.icon] || null,
			// meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
			meta: {
				...item.meta,
				permissions: item.meta.permissions || null,
			},
		};
		// 外链重置path
		if (currentRouter.meta && currentRouter.meta.menuType === '1') {
			currentRouter.path = currentRouter.meta.url
		} else {
			// 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
			currentRouter.path = currentRouter.path.replace('//', '/');
		}
		currentRouter.key = currentRouter.path
		// 重定向
		item.redirect && (currentRouter.redirect = item.redirect);
		// 是否有子菜单，并递归处理
		if (item.children && item.children.length > 0) {
			//如果未定义 redirect 默认第一个子路由为 redirect
			!item.redirect && (currentRouter.redirect = `${item.path}/${item.children[0].path}`);
			// Recursion
			currentRouter.children = routerGenerator(item.children, currentRouter);
		}
		return currentRouter;
	});
};

/**
 * 查找views中对应的组件文件
 * */
export const asyncImportRoute = (routes: AppRouteRecordRaw[] | undefined): void => {
	if (!routes) return;
	routes.forEach((item) => {
		if (!item.component && item.meta?.menuType === '0') {
			item.component = 'Iframe';
		}
		const { component, name } = item;
		const { children } = item;
		if (component) {
			const layoutFound = LayoutMap.get(component as string);
			if (layoutFound) {
				item.component = layoutFound;
			} else {
				item.component = routeAllPathToCompMap[`/src/views${item.component}`]
			}
		} else if (name) {
			item.component = ParentLayout;
		}
		children && asyncImportRoute(children);
	});
};