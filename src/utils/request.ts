import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { useUserInfo } from '@/stores/userInfo';
// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 50000,
	headers: { 'Content-Type': 'application/json' },
	paramsSerializer: {
		serialize(params) {
			return qs.stringify(params, { allowDots: true });
		},
	},
});

// 添加请求拦截器
service.interceptors.request.use((config: AxiosRequestConfig) => {
	// 在发送请求之前做些什么 token
	const userInfo = useUserInfo();
	config.headers!['a-token'] = userInfo.userInfos.token;
	return config;
},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		// 对响应数据做点什么
		const res = response.data;
		if (res.code && res.code !== 200) {
			// `token` 过期或者账号已在别处登录
			if (res.code === 403) {
				window.location.href = '/'; // 去登录页
				window['$message'].error('你已被登出，请重新登录')
			} else {
				window['$message'].error(res.message)

			}
			return Promise.reject(service.interceptors.response);
		} else {
			return response.data;
		}
	},
	(error) => {
		// 对响应错误做点什么
		if (error.message.indexOf('timeout') != -1) {
			window['$message'].error('网络超时');
		} else if (error.message == 'Network Error') {
			window['$message'].error('网络连接错误');
		} else {
			if (error.response.data) window['$message'].error(error.response.statusText);
			else window['$message'].error('接口路径找不到');
		}
		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;
