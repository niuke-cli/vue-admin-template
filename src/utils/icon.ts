import { NIcon } from "naive-ui";
import { AppstoreFilled, SettingOutlined, LinkOutlined, DesktopOutlined } from "@vicons/antd";


/**
 * render 图标
 * */
function renderIcon(icon: Component) {
	return () => h(NIcon, null, { default: () => h(icon) })
}
//前端路由图标映射表
export const constantRouterIcon = {
	AppstoreFilled: renderIcon(AppstoreFilled),
	SettingOutlined: renderIcon(SettingOutlined),
	LinkOutlined: renderIcon(LinkOutlined),
	DesktopOutlined: renderIcon(DesktopOutlined),
};