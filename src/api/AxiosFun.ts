import axios from './axios';
import { ApiKeyDataType } from './api';
import {
  AddUserType,
  CaptchaType,
  ChangMenuType,
  MenuList,
  NavType,
  Role,
  RoleInfo,
  RoleUpdateType,
  UpdateMenu,
  UserAllInfoById,
  UserInfo,
  UserType
} from './Result';
import { getToken } from '@/utils';

/**
 * 根据存储再LocalStorage里面的token拿到用户相关的数据
 * @constructor
 */
export async function GetUserInfo(): Promise<UserInfo> {
  const token = getToken();
  const res: ApiKeyDataType['GetUserInfo'] = await axios({
    url: 'GetUserInfo',
    headers: {
      Authorization: token
    },
    method: 'get'
  });
  return res.data;
}
export async function GetNav(): Promise<[NavType]> {
  const token = getToken();
  const res: ApiKeyDataType['GetMenu'] = await axios({
    url: 'GetMenu',
    headers: {
      Authorization: token
    },
    method: 'GET'
  });
  return res.data.nav;
}
export async function GetCaptchaFun(): Promise<CaptchaType> {
  const res: ApiKeyDataType['GetCaptcha'] = await axios({
    url: 'GetCaptcha',
    method: 'GET'
  });
  return res.data;
}

export async function GetUserListFun(): Promise<UserType> {
  const res: ApiKeyDataType['GetUserList'] = await axios({
    url: 'GetUserList',
    method: 'GET',
    headers: {
      Authorization: getToken()
    }
  });
  return res.data;
}
export async function GetUserListFunByName(username: string): Promise<UserType> {
  const res: ApiKeyDataType['GetUserList'] = await axios({
    url: 'GetUserList',
    method: 'GET',
    headers: {
      Authorization: getToken()
    },
    params: {
      username
    }
  });
  return res.data;
}
export async function GetAllRole(): Promise<[Role]> {
  const res: ApiKeyDataType['GetAllRole'] = await axios({
    url: 'GetAllRole',
    headers: {
      Authorization: getToken()
    }
  });
  return res.data.records;
}
export async function GetAllRoleByName(name: string): Promise<[Role]> {
  const res: ApiKeyDataType['GetAllRole'] = await axios({
    url: 'GetAllRole',
    headers: {
      Authorization: getToken()
    },
    params: {
      name
    }
  });
  return res.data.records;
}
export async function PostUpdateUserRole(rowId: number, date: number[]): Promise<string> {
  // const NewData: number[] = []
  const res: ApiKeyDataType['PostUserRole'] = await axios({
    url: 'PostUserRole',
    params: {
      id: rowId
    },
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'post',
    data: date
  });
  return res.data;
}

export async function UpdateUserPassDefault(userId: number): Promise<string> {
  const res: ApiKeyDataType['UpdateUserPass'] = await axios({
    url: 'UpdateUserPass',
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'post',
    data: userId
  });
  return res.data;
}

export async function UpdateUserInfoById(user: UserAllInfoById): Promise<string> {
  const res: ApiKeyDataType['UpdateUserInfo'] = await axios({
    url: 'UpdateUserInfo',
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'post',
    data: user
  });
  return res.data;
}
export async function DeleteUser(userId: number[]): Promise<string> {
  const res: ApiKeyDataType['DeleteUserById'] = await axios({
    url: 'DeleteUserById',
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'post',
    data: userId
  });
  return res.data;
}

export async function AddUser(user: AddUserType): Promise<string> {
  const res: ApiKeyDataType['AddUser'] = await axios({
    url: 'AddUser',
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'post',
    data: user
  });
  return res.data;
}
export async function GetMenuList(): Promise<MenuList[]> {
  const res: ApiKeyDataType['GetMenuList'] = await axios({
    url: 'GetMenuList',
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'get'
  });
  return res.data;
}
export async function GetRoleInfoList(id: string): Promise<RoleInfo> {
  const res: ApiKeyDataType['GetRoleInfoList'] = await axios({
    url: 'GetRoleInfoList',
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json; charset=utf-8'
    },
    params: {
      id
    },
    method: 'get'
  });
  return res.data;
}
export async function SetRolePerm(id: number, menuIds: number[]): Promise<number[]> {
  const res: ApiKeyDataType['SetRole'] = await axios({
    url: 'SetRole',
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json; charset=utf-8'
    },
    params: {
      id
    },
    data: menuIds,
    method: 'post'
  });
  return res.data;
}
export async function UpdateRoleList(data: RoleInfo): Promise<string> {
  const res: ApiKeyDataType['UpdateRole'] = await axios({
    url: 'UpdateRole',
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json; charset=utf-8'
    },
    data,
    method: 'post'
  });
  return res.data;
}
export async function DeleteRoleInfo(data: number[]): Promise<string> {
  const res: ApiKeyDataType['DeleteRole'] = await axios({
    url: 'DeleteRole',
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json; charset=utf-8'
    },
    data,
    method: 'post'
  });
  return res.data;
}
export async function AddRole(data: RoleUpdateType) {
  const res: ApiKeyDataType['AddRole'] = await axios({
    url: 'AddRole',
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json; charset=utf-8'
    },
    data,
    method: 'post'
  });
  return res.data;
}
export async function UpdateMenuFun(date: UpdateMenu, rowId: number): Promise<string> {
  const res: ApiKeyDataType['UpdateMenu'] = await axios({
    url: 'UpdateMenu',
    headers: {
      Authorization: getToken(),
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: ChangeValue(date, rowId),
    method: 'post'
  });
  return res.data;
}
function ChangeValue(Update: UpdateMenu, rowId: number) {
  const ChangMenu: ChangMenuType = {
    id: rowId,
    component: Update.components,
    icon: Update.icon,
    name: Update.menuName,
    orderNum: Update.inputNumberValue,
    parentId: Number(Update.SelectValue),
    path: Update.url,
    perms: Update.codeName,
    type: Number(Update.radioGroupValue)
  };
  return ChangMenu;
}
