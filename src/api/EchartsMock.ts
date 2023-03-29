import request from '@/utils/request';

export const getPieData = () => {
	// return request.get('http://127.0.0.1:4523/m1/2483123-0-default/getEchartsData/pie')
	return request.get('/getPieData')
}

export const getBarData = () => {
	// return request.get('https://mock.apifox.cn/m1/2483123-0-default/getEchartsData/bar')
	return request.get('/getBarData')
}

export const getLineData = () => {
	// return request.get('http://127.0.0.1:4523/m1/2483123-0-default/getEchartsData/pie')
	return request.get('/getLineData')
}

export const getLinesData = () => {
	// return request.get('http://127.0.0.1:4523/m1/2483123-0-default/getEchartsData/lines')
	return request.get('/getLinesData')
}