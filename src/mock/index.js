import { type } from "os"

export default [
	{
		url: "/api/auth/account",
		method: "post",
		response: () => {
			return {
				code: 0,
				message: "ok",
				data: {
					'rows|10': [{
						id: '@guid',
						name: '@cname',
						'age|20-30': 23,
						'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师']
					}]
				},
			}
		}
	},
	{
		url: "/api/getUsers",
		method: "get",
		response: () => {
			return {
				code: 0,
				message: "ok",
				data: {
					'rows|10': [{
						id: '@guid',
						name: '@cname',
						'age|20-30': 23,
						'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师']
					}]
				},
			}
		}
	},
	{
		url: "/api/getPieData",
		method: "get",
		response: () => {
			return {
				code: 0,
				message: "ok",
				data: {
					title:'@cword',
					'series|10':[{
						value:'@integer(60, 100)',
						name: '@cname'
					}]
			},
			}
		}
	},
	{
		url: "/api/getBarData",
		method: "get",
		response: () => {
			return {
				code: 0,
				message: "ok",
				data: {
					'time|10':['@time("H:m:s")'],
					'series|10':[{
						'data|10':['@integer(200, 1000)'],
						 name: '@cname'
					}]
				},
			}
		}
	},
	{
		url: "/api/getLinesData",
		method: "get",
		response: () => {
			return {
				code: 0,
				message: "ok",
				data: {
					'time|10':['@time("H:m:s")'],
					'series|10':[{
						'data|10':['@integer(200, 1000)'],
						name: '@cname'
					}]
			},
			}
		}
	},
	{
		url: '/api/menuList',
		method: 'get',
		response: () => {
			return {
				code: 200,
				message: 'success',
				data: [
					{
						path: '/setting',
						key: 'setting',
						component: 'Layout',
						meta: {
							title: '系统设置',
							icon: 'SettingOutlined'
						},
						children: [
							{
								path: '/menu',
								component: '/setting/menu/index.vue',
								key: 'menu',
								meta: {
									icon: '',
									title: '菜单管理'
								},
							},
							{
								path: '/role',
								component: '/setting/role/index.vue',
								key: 'role',
								meta: {
									icon: '',
									title: '角色管理'
								},
							},
							{
								path: '/user',
								component: '/setting/user/index.vue',
								key: 'user',
								meta: {
									icon: '',
									title: '用户管理'
								},
							}
						]
					},
					{
						path: '/inline',
						key: 'inline',
						component: 'Layout',
						meta: {
							icon: 'LinkOutlined',
							title: '内嵌链接'
						},
						children: [
							{
								path: '/url',
								key: 'url',
								meta: {
									menuType: '0',
									url: 'https://www.naiveui.com/zh-CN/os-theme/components/menu',
									icon: '',
									title: 'Naive UI 官网'
								},
							}
						]
					},
					{
						path: '/wi',
						key: 'external',
						component: 'Layout',
						meta: {
							icon: 'DesktopOutlined',
							title: '外部链接'
						},
						children: [
							{
								path: '',
								meta: {
									menuType: '1', // 0: 内嵌、1:外部链接
									icon: '',
									url: 'https://github.com/niuke-cli/vue-admin-template',
									title: 'github仓库地址'
								},
							}
						]
					}
				]
			}
		}
	}
]
