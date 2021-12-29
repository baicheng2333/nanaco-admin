import type { RouteKey } from '@/interface';

interface RouteConst {
  /** 路由名称 */
  name: RouteKey;
  /** 路由路径 */
  path: string;
  /** 路由标题 */
  title: string;
}

/** 声明的路由名称、路径和标题 */
const routeConstMap = new Map<RouteKey, RouteConst>([
  [
    'root',
    {
      name: 'root',
      path: '/',
      title: 'Root'
    }
  ],
  [
    'login',
    {
      name: 'login',
      path: '/login',
      title: '登录'
    }
  ],
  [
    'no-permission',
    {
      name: 'no-permission',
      path: '/403',
      title: '无权限'
    }
  ],
  [
    'not-found',
    {
      name: 'not-found',
      path: '/404',
      title: '未找到'
    }
  ],
  [
    'service-error',
    {
      name: 'service-error',
      path: '/500',
      title: '服务器错误'
    }
  ],
  [
    'dashboard',
    {
      name: 'dashboard',
      path: '/dashboard',
      title: '仪表盘'
    }
  ],
  [
    'dashboard_analysis',
    {
      name: 'dashboard_analysis',
      path: '/dashboard/analysis',
      title: '分析页'
    }
  ],
  [
    'dashboard_workbench',
    {
      name: 'dashboard_workbench',
      path: '/dashboard/workbench',
      title: '工作台'
    }
  ],
  [
    'exception',
    {
      name: 'exception',
      path: '/exception',
      title: '异常页'
    }
  ],
  [
    'exception_403',
    {
      name: 'exception_403',
      path: '/exception/403',
      title: '异常页-403'
    }
  ],
  [
    'exception_404',
    {
      name: 'exception_404',
      path: '/exception/404',
      title: '异常页-404'
    }
  ],
  [
    'exception_500',
    {
      name: 'exception_500',
      path: '/exception/500',
      title: '异常页-500'
    }
  ],
  [
    'website',
    {
      name: 'website',
      path: '/website',
      title: '网址导航'
    }
  ]
]);

/** 获取路由的声明(name、path、title) */
export function getRouteConst(key: RouteKey) {
  return routeConstMap.get(key)!;
}
/** 路由名称 */
export function routeName(key: RouteKey) {
  return routeConstMap.get(key)!.name;
}
/** 路由路径 */
export function routePath(key: RouteKey) {
  return routeConstMap.get(key)!.path;
}
/** 路由标题 */
export function routeTitle(key: RouteKey) {
  return routeConstMap.get(key)!.title;
}
