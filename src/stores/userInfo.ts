import { defineStore, storeToRefs } from 'pinia';
declare interface UserInfosState<T = any> {
	userInfos: {
		avatar: string;
		chatId: string;
		email: string;
		id: number;
		nickName: string;
		phone: string;
		realName: string;
		roles: string[];
		token: string;
		usrSign: string;
	} ,
	isLogin: boolean;
}
/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosState => ({
		userInfos: {
			avatar: '',
			chatId: '',
			email: '',
			id: 0,
			nickName: '',
			phone: '',
			realName: '',
			roles: [],
			token: '',
			usrSign: '',
		},
		isLogin: false,
	}),
	actions: {
		async setUserInfos(data: UserInfosState) {
			this.userInfos = data;
		}
	},
	persist: true
})