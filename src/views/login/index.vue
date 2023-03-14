<template>
	<div class="login-container flex">
		<div class="login-left">
			<div class="login-left-logo">
				<div class="login-left-logo-text">
					<span>VUE后台管理系统</span>
					<span class="login-left-logo-text-msg">专注、免费、开源、维护、解疑</span>
				</div>
				<div class="login-left-img">
					
				</div>
				<div class="login-left-waves"></div>
			</div>
		</div>
		<div class="login-right flex">
			<div class="login-right-warp flex-margin">
				<span class="login-right-warp-one"></span>
				<span class="login-right-warp-two"></span>
				<div class="login-right-warp-mian">
					<div class="login-right-warp-main-title">欢迎您</div>
					<div class="login-right-warp-main-form">
						<div v-if="!state.isScan">
							<n-tabs v-model:value="state.tabsActiveName">
								<n-tab-pane name="account" tab="用户名登录">
									<Account />
								</n-tab-pane>
								<n-tab-pane name="mobile" tab="手机号登录">
									<Mobile />
								</n-tab-pane>
							</n-tabs>
						</div>
						<Scan v-if="state.isScan"/>
						<div class="login-content-main-sacn" @click="state.isScan = !state.isScan">
							<n-icon size="47" class="iconfont" :class="state.isScan ? 'icon-diannao1' : 'icon-barcode-qr'">
								<svg v-if="!state.isScan" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
									<path
									    d="M877.714286 1024 877.714286 780.190476 1024 780.190476 1024 1024 877.714286 1024ZM975.433143 828.269714 926.232381 828.269714 926.232381 975.872 975.433143 975.872 975.433143 828.269714ZM536.380952 1024 536.380952 536.380952 730.989714 536.380952 730.989714 682.910476 975.676952 682.910476 975.676952 536.380952 1024 536.380952 1024 730.89219 682.812952 730.89219 682.812952 585.874286 584.94781 585.874286 584.94781 1023.268571M536.380952 0 1024 0 1024 487.619048 536.380952 487.619048 536.380952 0ZM584.46019 439.53981 975.920762 439.53981 975.920762 48.030476 584.46019 48.030476 584.46019 439.53981ZM682.666667 146.285714 877.714286 146.285714 877.714286 341.333333 682.666667 341.333333 682.666667 146.285714ZM730.989714 293.010286 829.391238 293.010286 829.391238 194.608762 730.989714 194.608762 730.989714 293.010286ZM0 536.380952 487.619048 536.380952 487.619048 1024 0 1024 0 536.380952ZM48.030476 975.920762 439.53981 975.920762 439.53981 584.411429 48.030476 584.411429 48.030476 975.920762ZM146.285714 682.666667 341.333333 682.666667 341.333333 877.714286 146.285714 877.714286 146.285714 682.666667ZM194.608762 829.391238 293.010286 829.391238 293.010286 730.989714 194.608762 730.989714 194.608762 829.391238ZM0 0 487.619048 0 487.619048 487.619048 0 487.619048 0 0ZM48.030476 439.53981 439.53981 439.53981 439.53981 48.030476 48.030476 48.030476 48.030476 439.53981ZM146.285714 146.285714 341.333333 146.285714 341.333333 341.333333 146.285714 341.333333 146.285714 146.285714ZM194.608762 293.010286 293.010286 293.010286 293.010286 194.608762 194.608762 194.608762 194.608762 293.010286ZM828.952381 1024 682.666667 1024 682.666667 780.190476 828.952381 780.190476 828.952381 1024ZM780.385524 828.269714 731.184762 828.269714 731.184762 975.872 780.385524 975.872 780.385524 828.269714Z"
									/>
								</svg>
								<svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
									<path
									    d="M507.6 255.1c-85.1 0-154 68.9-154 154s68.9 154 154 154 154-68.9 154-154-69-154-154-154z m22.9 178.5v63h-50.8v-63h-63v-50.8h63v-63h50.8v63h63v50.8h-63zM729.5 893h-435c-6.6 0-12-5.4-12-12v-36c0-6.6 5.4-12 12-12h435c6.6 0 12 5.4 12 12v36c0 6.6-5.4 12-12 12z" p-id="6390" fill="#409EFF"></path><path d="M950 190.8c0-33-27-60-60-60H125.1c-33 0-60 27-60 60v516.1-69.5h50V190.8c0-5.4 4.6-10 10-10H890c5.4 0 10 4.6 10 10v446.5h50v69.5-516z" p-id="6391" fill="#409EFF"></path><path d="M900 637.3H65.1v70c0 33 27 60 60 60H890c33 0 60-27 60-60v-70h-50z m-392.4 36.5c15.7 0 28.5 12.8 28.5 28.5s-12.8 28.5-28.5 28.5-28.5-12.8-28.5-28.5 12.7-28.5 28.5-28.5z"
									/>
								</svg>
							</n-icon>
							<div class="login-content-main-sacn-delta"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- <div>登录页</div> -->
	<!-- <Account></Account>
	<Mobile></Mobile>
	<Scan></Scan> -->
	<!-- <n-button @click="submit">登录</n-button> -->
</template>

<script setup lang="ts">
	import { reactive ,defineAsyncComponent} from 'vue'
	// import { useLoginApi } from '@/api/login';
	//引入组件
	const Account = defineAsyncComponent(() => import('@/views/login/component/account.vue'));
	const Mobile = defineAsyncComponent(() => import('@/views/login/component/mobile.vue'));
	const Scan = defineAsyncComponent(() => import('@/views/login/component/scan.vue'));
	const state = reactive({
		tabsActiveName: 'account',
		isScan: false,
	});
	// const useLogin = useLoginApi();
	// const state = reactive({
	// 	ruleForm: {
	// 		userName: '15396601126',
	// 		password: 'aa23703792',
	// 	},
	// });
	// const toLogin=()=>{
	// 	return useLogin.signIn({
	// 		account:state.ruleForm.userName,
	// 		password:state.ruleForm.password,
	// 	})
	// }
	// const submit= async () => {
	// 	const res = await toLogin();
	// 	console.log(res);
	// }
</script>

<style scoped lang="scss">
	.flex{
		display: flex;
	}
	.login-container {
		width:100vw;
		height: 100vh;
		background: #ffffff;
		.login-left {
			flex: 1;
			position: relative;
			background-color: rgba(211, 239, 255, 1);
			margin-right: 100px;
			.login-left-logo {
				display: flex;
				align-items: center;
				position: absolute;
				top: 50px;
				left: 80px;
				z-index: 1;
				animation: logoAnimation 0.3s ease;
				img {
					width: 52px;
					height: 52px;
				}
				.login-left-logo-text {
					display: flex;
					flex-direction: column;
					span {
						margin-left: 10px;
						font-size: 28px;
						color: #26a59a;
					}
					.login-left-logo-text-msg {
						font-size: 12px;
						color: #32a99e;
					}
				}
			}
			.login-left-img {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 100%;
				height: 52%;
				img {
					width: 100%;
					height: 100%;
					animation: error-num 0.6s ease;
				}
			}
			.login-left-waves {
				position: absolute;
				top: 0;
				right: -100px;
			}
		}
		.login-right {
			width: 700px;
			.login-right-warp {
				border: 1px solid #79bbff;
				border-radius: 3px;
				width: 500px;
				height: 500px;
				position: relative;
				overflow: hidden;
				background-color: #ffffff;
				.login-right-warp-one,
				.login-right-warp-two {
					position: absolute;
					display: block;
					width: inherit;
					height: inherit;
					&::before,
					&::after {
						content: '';
						position: absolute;
						z-index: 1;
					}
				}
				.login-right-warp-one {
					&::before {
						filter: hue-rotate(0deg);
						top: 0px;
						left: 0;
						width: 100%;
						height: 3px;
						background: linear-gradient(90deg, transparent, #409eff);
						animation: loginLeft 3s linear infinite;
					}
					&::after {
						filter: hue-rotate(60deg);
						top: -100%;
						right: 2px;
						width: 3px;
						height: 100%;
						background: linear-gradient(180deg, transparent, #409eff);
						animation: loginTop 3s linear infinite;
						animation-delay: 0.7s;
					}
				}
				.login-right-warp-two {
					&::before {
						filter: hue-rotate(120deg);
						bottom: 2px;
						right: -100%;
						width: 100%;
						height: 3px;
						background: linear-gradient(270deg, transparent, #409eff);
						animation: loginRight 3s linear infinite;
						animation-delay: 1.4s;
					}
					&::after {
						filter: hue-rotate(300deg);
						bottom: -100%;
						left: 0px;
						width: 3px;
						height: 100%;
						background: linear-gradient(360deg, transparent,#409eff);
						animation: loginBottom 3s linear infinite;
						animation-delay: 2.1s;
					}
				}
				.login-right-warp-mian {
					display: flex;
					flex-direction: column;
					height: 100%;
					.login-right-warp-main-title {
						height: 130px;
						line-height: 130px;
						font-size: 27px;
						text-align: center;
						letter-spacing: 3px;
						animation: logoAnimation 0.3s ease;
						animation-delay: 0.3s;
						color: #303133;
					}
					.login-right-warp-main-form {
						flex: 1;
						padding: 0 50px 50px;
						.login-content-main-sacn {
							position: absolute;
							top: 0;
							right: 0;
							width: 50px;
							height: 50px;
							overflow: hidden;
							cursor: pointer;
							transition: all ease 0.3s;
							color: #409eff;
							&-delta {
								position: absolute;
								width: 35px;
								height: 70px;
								z-index: 2;
								top: 2px;
								right: 21px;
								background: #ffffff;
								transform: rotate(-45deg);
							}
							&:hover {
								opacity: 1;
								transition: all ease 0.3s;
								color: #409eff !important;
							}
							i {
								width: 47px;
								height: 50px;
								display: inline-block;
								font-size: 48px;
								position: absolute;
								right: 1px;
								top: 0px;
							}
						}
					}
				}
			}
		}
	}
</style>