import { defineComponent } from 'vue';
import type { RouteRecordRaw, RouteMeta } from 'vue-router';
export type Component<T extends any = any> =
	| ReturnType<typeof defineComponent>
	| (() => Promise<typeof import('*.vue')>)
	| (() => Promise<T>);

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
	name: string;
	meta: RouteMeta;
	component?: Component | string;
	components?: Component;
	children?: AppRouteRecordRaw[];
	props?: Recordable;
	fullPath?: string;
}

