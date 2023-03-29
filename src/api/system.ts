import request from '@/utils/request';

export const getMenuListApi = () => {
	return request.get('/menuList')
}