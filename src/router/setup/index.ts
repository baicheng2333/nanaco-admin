import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { routes } from '@/router';
import menus from './menus';
import { createRouterGuide } from '../guard';
import { getToken, transformMultiDegreeRoutes, transformRouteToMenu } from '@/utils';
import MyMenu from '@/router/route';

/** 用于部署vercel托管服务 */
const isStaging = import.meta.env.VITE_HTTP_ENV === 'STAGING';

export const router = createRouter({
  history: isStaging ? createWebHashHistory() : createWebHistory(),
  routes
});

// 在路由初始化时加载动态路由
export async function setupRouter(app: App) {
  const token = getToken();
  const isLogin = Boolean(token);
  if (isLogin) {
    const MyMenuData: RouteRecordRaw[] = await MyMenu();
    if (MyMenuData.length > 0) {
      const toMenu = transformRouteToMenu(MyMenuData);
      menus.push(...toMenu);
      const degreeRoutes = transformMultiDegreeRoutes(MyMenuData);
      degreeRoutes.forEach(e => {
        router.addRoute(e);
      });
    }
  }
  app.use(router);
  createRouterGuide(router);
  await router.isReady();
}

export { default as cacheRoutes } from './cache';
export { default as menus } from './menus';
