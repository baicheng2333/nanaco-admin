import { RouteRecordRaw } from 'vue-router';
import { GetNav } from '@/api/AxiosFun';
import { BasicLayout } from '@/layouts';
import { User, Menu, Role, Test } from '@/views';
import { NavTypeChild } from '@/api/Result';

const GetUser = User;
const GetMenuPage = Menu;
const GetRole = Role;
const GetTest = Test;
function GetComponent(key: string) {
  if (key === 'users') {
    return GetUser;
  }
  if (key === 'menu') {
    return GetMenuPage;
  }
  if (key === 'role') {
    return GetRole;
  }
  if (key === 'admin') {
    return GetTest;
  }
}

async function GetMenu() {
  // 二级路由转换
  function NavTypeToChildren(res: [NavTypeChild] | undefined) {
    const child: RouteRecordRaw[] = [];
    res?.forEach(e => {
      const route: RouteRecordRaw = {
        name: e.path,
        path: e.path,
        component: GetComponent(e.component) as any,
        meta: {
          requiresAuth: true,
          title: e.title,
          fullPage: true
        }
      };
      child.push(route);
    });
    return child;
  }
  const res = await GetNav();
  const routed: RouteRecordRaw[] = [];
  if (res.length > 0) {
    // 一级路由
    res.forEach(e => {
      const route: RouteRecordRaw = {
        name: e.path,
        path: e.path,
        component: BasicLayout,
        redirect: e.children?.[0].path,
        meta: {
          title: e.title,
          icon: 'ant-design:exception-outlined',
          keepAlive: true
        },
        children: NavTypeToChildren(e.children)
      };
      routed.push(route);
    });
  }
  return routed;
}
const MyMenu = async () => {
  const menu = await GetMenu();
  return menu;
};
export default MyMenu;
