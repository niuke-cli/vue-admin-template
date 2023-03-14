<template>
	<n-form size="large" class="login-content-form">
		<n-form-item class="login-animation1">
			<n-input v-model:value="state.ruleForm.userName" placeholder="账号" />
		</n-form-item>
		<n-form-item class="login-animation2">
			<n-input v-model:value="state.ruleForm.password" show-password-on="click" type="password" placeholder="密码"></n-input>
		</n-form-item>
		<n-form-item class="login-animation3">
			<n-grid :cols="4" >
				<n-grid-item span="3">
					<n-form-item-gi>
						<n-input placeholder="验证码"></n-input>
					</n-form-item-gi>
				</n-grid-item>
				<n-grid-item >
					<n-form-item-gi>
						<n-button>发送短信</n-button>
					</n-form-item-gi>
				</n-grid-item>
			</n-grid>
		</n-form-item>
		<n-form-item class="login-animation4">
			<n-button round type="primary" style="flex:1" @click="submit">登录</n-button>
		</n-form-item>
	</n-form>
</template>

<script setup lang="ts">
	import { reactive } from 'vue'
	import { useLoginApi } from '@/api/login';
	import { useRouter } from 'vue-router';
	const useLogin = useLoginApi();
	const route = useRouter();
	const state = reactive({
		isShowPassword: false,
		ruleForm: {
			userName: '15396601126',
			password: 'aa23703792',
			code: '1234',
		},
		loading: {
			signIn: false,
		},
	});
	const toLogin=()=>{
		return useLogin.signIn({
			account:state.ruleForm.userName,
			password:state.ruleForm.password,
		})
	}
	const submit= async ()=>{
		const res = await toLogin();
		window.$notification.success({
			content: '欢迎回来'+res.data.realName,
			duration:3000,
		})
		route.replace('/')
	}
</script>

<style scoped lang="scss">
.login-content-form {
	@for $i from 1 through 4 {
		.login-animation#{$i} {
			opacity: 0;
			animation-name: error-num;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;
			animation-delay: calc($i/10) + s;
			height:40px;
			margin-bottom:20px;
		}
	}
	.login-content-password {
		display: inline-block;
		width: 20px;
		cursor: pointer;
		&:hover {
			color: #909399;
		}
	}
	.login-content-code {
		width: 100%;
		padding: 0;
		font-weight: bold;
		letter-spacing: 5px;
	}
	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 15px;
	}
}
</style>