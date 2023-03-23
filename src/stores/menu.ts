import { defineStore } from "pinia";
import { getMenuListApi } from '@/api/system'

interface menuType {
	name: string,
	path: string,
	title: string,
	icon: string
}



/**
 * 菜单信息
 * @methods 
 */
export const menuInfo = defineStore('menuInfo', {
	state: () => ({
		menuList: [] as Array<menuType>
	}),
	actions: {
		async addMenu(data: menuType) {
			this.menuList.push(data);
		},
		async getMenuList() {
			await getMenuListApi().then(res => {
				this.menuList = res.data

			})
		}
	},
	persist: true
})



