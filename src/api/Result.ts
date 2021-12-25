export interface Result<T> {
  flag: boolean;
  code: number;
  message: string;
  data: T;
}
export interface ResultMenu<T> {
  flag: boolean;
  code: number;
  message: string;
  data: { nav: [T] };
}
export interface UserInfo {
  id: number;
  avatar: string;
  username: string;
}

export interface LoginParams {
  username: string;
  password: string;
  token: string;
  code: string;
}
export interface NavTypeChild {
  id: number;
  name: string;
  title: string;
  icon?: string;
  path: string;
  component: string;
  children?: [];
}
export interface NavType {
  id: number;
  name: string;
  title: string;
  icon?: string;
  path: string;
  component?: string;
  children?: [NavTypeChild];
}

export interface CaptchaType {
  base64Img: string;
  key: string;
}
export interface UserAllInfoById {
  id: number;
  created: string;
  updated?: string;
  status: string;
  username: string;
  avatar: string;
  email: string;
  city?: string;
  lastLogin?: string;
  roles: [
    {
      id?: number;
      created?: string;
      updated?: string;
      status?: string;
      name: string;
      code?: string;
      remark?: string;
      menuIds?: string;
    }
  ];
}
export interface AddUserType {
  username: string;
  email: string;
  status: string;
}
export interface UserType {
  records: [
    {
      id: number;
      created: string;
      updated?: string;
      status: string;
      username: string;
      avatar: string;
      email: string;
      city?: string;
      lastLogin?: string;
      roles: [
        {
          id?: number;
          created?: string;
          updated?: string;
          status?: string;
          name: string;
          code?: string;
          remark?: string;
          menuIds?: string;
        }
      ];
    }
  ];
}
export interface UserTableType {
  key: number;
  username: string;
  avatar: string[];
  role_name: string[];
  created: string;
  status: string[];
  email: string;
  set: string[];
}
export interface UserRoleInfo {
  id: number;
  created: string;
  updated?: string;
  status: string;
  username: string;
  avatar: string;
  email: string;
  city?: string;
  lastLogin?: string;
  roles: [
    {
      id?: number;
      created?: string;
      updated?: string;
      status?: string;
      name: string;
      code?: string;
      remark?: string;
      menuIds?: string;
    }
  ];
}
export interface AllRole {
  records: [Role];
}

export interface Role {
  id: number;
  created: string;
  updated: string;
  status: number;
  name: string;
  code: string;
  remark: string;
  menuIds: string[];
}
export interface RoleDataType {
  key: number;
  name: string;
  code: string;
  remark: string;
  status: string;
  set: string[];
}

export interface Tree {
  key: string;
  label: string;
  children?: Tree[];
}

export interface MenuList {
  id: number;
  created: string;
  updated: string;
  status: string;
  parentId: number;
  name: string;
  path: string;
  perms: string;
  component: string;
  type: string;
  icon: string;
  orderNum: string;
  child: MenuList[];
}

export interface RoleInfo {
  id: number;
  created: string;
  updated: string;
  status: string;
  name: string;
  code: string;
  remark: string;
  menuIds: number[];
}
export interface RoleUpdateType {
  name: string;
  code: string;
  remark: string;
  status: string;
}
export interface MenuDataType {
  key: number;
  name: string;
  code: string;
  icon: string;
  type: string;
  URL: string;
  components: string;
  sort: string;
  status: string;
  set: string[];
  parentId: number;
  children: MenuDataType[];
}
export interface GetParentsType {
  label: string;
  value: string;
}
export interface UpdateMenu {
  SelectValue: string;
  menuName: string;
  codeName: string;
  icon: string;
  url: string;
  components: string;
  radioGroupValue: string;
  radioGroupValueStatus: string;
  inputNumberValue: number;
}

export interface ChangMenuType {
  id: number;
  parentId: number;
  name: string;
  path: string;
  perms: string;
  component: string;
  type: number;
  icon: string;
  orderNum: number;
}
