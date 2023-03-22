import { defineStore } from "pinia";


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
		}
	},
	persist: true
})

