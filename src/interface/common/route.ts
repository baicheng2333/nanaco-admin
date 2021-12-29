import type { RouteRecordRaw } from 'vue-router';

/** 导入的路由模块 */
export type ImportedRouteModules = Record<string, { default: RouteRecordRaw; [key: string]: any }>;

/** 路由声明的key */
export type RouteKey =
  | 'root'
  | 'login'
  | 'not-found'
  | 'no-permission'
  | 'service-error'
  // 自定义路由
  | 'dashboard'
  | 'dashboard_analysis'
  | 'dashboard_workbench'
  | 'exception'
  | 'exception_403'
  | 'exception_404'
  | 'exception_500'
  | 'website';
