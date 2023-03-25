import request from '@/utils/request';

export const getPieData = () => {
	return request.get('http://127.0.0.1:4523/m1/2483123-0-default/getEchartsData/pie')
}

export const getBarData = () => {
	return request.get('https://mock.apifox.cn/m1/2483123-0-default/getEchartsData/bar')
}

export const getLineData = () => {
	return request.get('http://127.0.0.1:4523/m1/2483123-0-default/getEchartsData/pie')
}

export const getLinesData = () => {
	return request.get('http://127.0.0.1:4523/m1/2483123-0-default/getEchartsData/pie')
}