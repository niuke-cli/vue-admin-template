import request from '@/utils/request';
export function useLoginApi(){{
	return {
		signIn:(data:object)=>{
			return request({
				url: '/auth/account',
				method: 'post',
				data,
			})
		}
	}
}}