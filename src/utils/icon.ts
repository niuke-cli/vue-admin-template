import { NIcon } from "naive-ui";
import { AppstoreOutlined, SettingOutlined, LinkOutlined, DesktopOutlined, UngroupOutlined, ContainerTwotone } from "@vicons/antd";


/**
 * render 图标
 * */
function renderIcon(icon: Component) {
	return (props: any) => {
		return h(NIcon, { size: props?.size }, { default: () => h(icon) })
	}
}
//前端路由图标映射表
export const constantRouterIcon = {
	AppstoreOutlined: renderIcon(AppstoreOutlined),
	SettingOutlined: renderIcon(SettingOutlined),
	LinkOutlined: renderIcon(LinkOutlined),
	DesktopOutlined: renderIcon(DesktopOutlined),
	UngroupOutlined: renderIcon(UngroupOutlined),
	ContainerTwotone: renderIcon(ContainerTwotone),
};

export const JIcon = {
	props: ['iconName', 'size'],
	setup(props: any) {
		return constantRouterIcon[props.iconName]
	}
}