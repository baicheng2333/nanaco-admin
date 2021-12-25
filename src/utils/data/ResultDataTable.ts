import { UserAllInfoById, UserRoleInfo, UserTableType, UserType } from '@/api/Result';

export function DataTable(res: UserType) {
  const UserDate: UserTableType[] = [];
  res.records.forEach(item => {
    UserDate.push({
      key: item.id,
      username: item.username,
      avatar: [item.avatar],
      role_name: GetRoles(item.roles),
      created: item.created,
      status: [`${item.status}`],
      email: item.email,
      set: ['分配角色', '重置密码', '编辑', '删除']
    });
  });
  return UserDate;
}

function GetRoles(
  roleItem: [
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
  ]
) {
  const Date: string[] = [];
  roleItem.forEach(e => {
    Date.push(e.name);
  });
  return Date;
}

export function GetUserRoleById(user: UserRoleInfo) {
  const roles: string[] = [];
  user.roles.forEach(e => {
    roles.push(e.name);
  });
  return roles;
}

export function GetUserData(key: number, AllUserInfo: UserType): UserAllInfoById {
  let value: UserAllInfoById = <UserAllInfoById>{};
  AllUserInfo.records.forEach(e => {
    if (key === e.id) {
      value = e as UserAllInfoById;
    }
  });
  return value;
}
