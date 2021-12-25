/**
 * @description: 所有的接口列表
 * @param {*} 无参数
 * @return {*} 无返回值
 * ```js
 * key表示url路径缩写
 * value表示真实请求的路径
 * ```
 */
import {
  AllRole,
  CaptchaType,
  MenuList,
  NavType,
  Result,
  ResultMenu,
  RoleInfo,
  UserInfo,
  UserRoleInfo,
  UserType
} from './Result';

export const ApiList = {
  GetUserInfo: '/api/sys/userInfo',
  Login: '/api/login',
  GetMenu: '/api/sys/menu/nav',
  GetCaptcha: '/api/captcha',
  GetUserList: '/api/sys/user/list',
  GetUserRoleInfo: '/api/sys/user/info',
  GetAllRole: '/api/sys/role/list',
  PostUserRole: '/api/sys/user/role',
  UpdateUserPass: '/api/sys/user/repass',
  UpdateUserInfo: '/api/sys/user/update',
  DeleteUserById: '/api/sys/user/delete',
  AddUser: '/api/sys/user/save',
  GetMenuList: '/api/sys/menu/list',
  GetRoleInfoList: '/api/sys/role/info',
  SetRole: '/api/sys/role/perm',
  UpdateRole: '/api/sys/role/update',
  DeleteRole: '/api/sys/role/delete',
  AddRole: '/api/sys/role/save',
  UpdateMenu: '/api/sys/menu/update'
};
/**
 * @description: 所有的接口列表类型
 * @param {*} 无参数
 * @return {*} 无返回值
 */
export type ApiKeyType = keyof typeof ApiList;
/**
 * @description: 接口对应的数据返回值类型
 * @param {*} 无参数
 * @return {*} 无返回值
 */
export interface ApiKeyDataType {
  GetUserInfo: Result<UserInfo>;
  Login: Result<string>;
  GetMenu: ResultMenu<NavType>;
  GetCaptcha: Result<CaptchaType>;
  GetUserList: Result<UserType>;
  GetUserRoleInfo: Result<UserRoleInfo>;
  GetAllRole: Result<AllRole>;
  PostUserRole: Result<string>;
  UpdateUserPass: Result<string>;
  UpdateUserInfo: Result<string>;
  DeleteUserById: Result<string>;
  AddUser: Result<string>;
  GetMenuList: Result<MenuList[]>;
  GetRoleInfoList: Result<RoleInfo>;
  SetRole: Result<number[]>;
  UpdateRole: Result<string>;
  DeleteRole: Result<string>;
  AddRole: Result<string>;
  UpdateMenu: Result<string>;
}
