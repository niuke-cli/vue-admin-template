import { defineStore } from "pinia";
import { getMenuListApi } from '@/api/system'
import { RouteRecordName } from 'vue-router'
import { routerGenerator, asyncImportRoute } from '@/utils/router'
import { modulesRouters } from '@/router'
import { TagsType } from '@/type/tags'
import pinia from '@/stores';
/**
 * 菜单信息
 * @methods 
 */
export const menuInfo = defineStore('menuInfo', {
	state: () => ({
		menuList: modulesRouters,
		nowMenu: '/console' as RouteRecordName,
		nowTag: 'console',
		tagList: [{
			name: 'console',
			title: '控制台'
		}] as Array<TagsType>
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
			} catch (error) { }
		},
		addTag(value: TagsType) {
			let isExist = this.tagList.some(item => item.name === value.name)
			if (isExist) return
			this.tagList.push(value)
		},
		delTag(value: TagsType) {
			let tagIndex = this.tagList.findIndex(item => item.name === value.name)
			this.tagList.splice(tagIndex, 1)
		}
	},
	// persist: true
})


// Need to be used outside the setup
export function useDesignSettingWithOut() {
	return menuInfo(pinia);
}


