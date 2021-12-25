// import type { RouteRecordRaw } from 'vue-router';
// import { BasicLayout } from '@/layouts';
// import { User, Role, Menu } from '@/views';
// import { routeName, routePath, routeTitle } from '../constant';
//
// const sys: RouteRecordRaw = {
//   name: routeName('sys'),
//   path: routePath('sys'),
//   component: BasicLayout,
//   redirect: {
//     name: routeName('users')
//   },
//   meta: {
//     requiresAuth: true,
//     title: routeTitle('sys'),
//     icon: 'ant-design:exception-outlined',
//     order: 8
//   },
//   children: [
//     {
//       name: routeName('users'),
//       path: routePath('users'),
//       component: User,
//       meta: {
//         requiresAuth: true,
//         title: routeTitle('users'),
//         fullPage: true
//       }
//     },
//     {
//       name: routeName('roles'),
//       path: routePath('roles'),
//       component: Role,
//       meta: {
//         requiresAuth: true,
//         title: routeTitle('roles'),
//         fullPage: true
//       }
//     },
//     {
//       name: routeName('menus'),
//       path: routePath('menus'),
//       component: Menu,
//       meta: {
//         requiresAuth: true,
//         title: routeTitle('menus'),
//         fullPage: true
//       }
//     }
//   ]
// };
// export default sys;
