import { defineStore } from "pinia";
import { getMenuListApi } from '@/api/system'
import { RouteRecordName } from 'vue-router'
import { routerGenerator, asyncImportRoute } from '@/utils/router'
import { modulesRouters } from '@/router'
/**
 * 菜单信息
 * @methods 
 */
export const menuInfo = defineStore('menuInfo', {
	state: () => ({
		menuList: modulesRouters,
		nowMenu: '/console' as RouteRecordName
	}),
	actions: {
		async getMenuList() {
			try {
				// 获取菜单数据
				const { data } = await getMenuListApi()
				// 重构菜单数据格式
				let routeList = routerGenerator(data)
				// 动态导入路由
				asyncImportRoute(routeList);
				// 合并菜单
				this.menuList = this.menuList.concat(routeList)
				return routeList
			} catch (error) {}
		}
	},
	// persist: true
})




