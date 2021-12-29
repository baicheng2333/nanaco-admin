<template>
  <NSpace style="margin-bottom: 20px">
    <NInput v-model:value="searchValue" placeholder="请输入用户名"></NInput>
    <NButton @click="GetUserListByName">搜索</NButton>
    <NButton @click="addUser">新增</NButton>
  </NSpace>
  <NDataTable :columns="columns" :data="data" :pagination="pagination" />
  <NModal v-model:show="showFlag" preset="card" title="分配角色" style="width: 400px">
    <NCard style="width: 300px" :bordered="false" size="huge">
      <template #header-extra></template>
      <NCheckboxGroup v-model:value="cities" @update:value="handleUpdateValue">
        <NCheckbox v-for="(item, index) in AllRoleDate" :key="index" :checked="true" :value="item[0]">
          {{ item[1] }}
        </NCheckbox>
        <NButton style="margin-top: 20px; float: right" @click="subLine(rowKeyNow)">确定</NButton>
      </NCheckboxGroup>
      <template #footer></template>
    </NCard>
  </NModal>
  <NModal
    v-model:show="showModalPass"
    preset="dialog"
    :title="updateTitle"
    content="密码重置后默认为8个8,用户请自行修改密码"
    positive-text="确认"
    negative-text="算了"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  ></NModal>
  <NModal
    v-model:show="editFlag"
    class="custom-card"
    preset="card"
    style="width: 600px"
    title="用户编辑"
    size="huge"
    :bordered="false"
    :segmented="{
      content: 'soft',
      footer: 'soft'
    }"
  >
    <template #header-extra>编辑用户信息</template>
    <NForm ref="formRef" :label-width="160" :model="formValue" :rules="rules" size="medium">
      <n-form-item label="姓名" path="user.name">
        <n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
      </n-form-item>
      <n-form-item label="邮箱" path="user.emile">
        <n-input v-model:value="formValue.user.emile" placeholder="输入邮箱" />
      </n-form-item>
      <n-form-item label="状态">
        <n-radio-group v-model:value="formValue.radioGroupValue" name="radio group">
          <NSpace justify="start" size="large">
            <n-radio value="1">正常</n-radio>
            <n-radio value="0">禁用</n-radio>
          </NSpace>
        </n-radio-group>
      </n-form-item>
    </NForm>
    <template #footer>
      <NSpace justify="end">
        <NButton @click="revoke">取消</NButton>
        <NButton @click="GetEdit">确定</NButton>
      </NSpace>
    </template>
  </NModal>
  <n-modal
    v-model:show="deleteFlag"
    preset="dialog"
    title="确认"
    :content="deleteInfo"
    positive-text="确认"
    negative-text="算了"
    @positive-click="DeleteChecked"
    @negative-click="RevokeDelete"
  />

  <NModal
    v-model:show="AddFlag"
    class="custom-card"
    preset="card"
    style="width: 600px"
    title="新增用户"
    size="huge"
    :bordered="false"
    :segmented="{
      content: 'soft',
      footer: 'soft'
    }"
  >
    <template #header-extra>编辑新增用户信息</template>
    <NForm ref="formRef" :label-width="160" :model="formValue" :rules="rules" size="medium">
      <n-form-item label="姓名" path="user.name">
        <n-input v-model:value="formValue.user.name" placeholder="初始密码为8个8" />
      </n-form-item>
      <n-form-item label="邮箱" path="user.emile">
        <n-input v-model:value="formValue.user.emile" placeholder="输入邮箱" />
      </n-form-item>
      <n-form-item label="状态">
        <n-radio-group v-model:value="formValue.radioGroupValue" name="radio group">
          <NSpace justify="start" size="large">
            <n-radio value="1">正常</n-radio>
            <n-radio value="0">禁用</n-radio>
          </NSpace>
        </n-radio-group>
      </n-form-item>
    </NForm>
    <template #footer>
      <NSpace justify="end">
        <NButton @click="GoBack">取消</NButton>
        <NButton @click="AddUsers">确定</NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue';
import {
  NDataTable,
  NForm,
  NModal,
  NCard,
  NCheckbox,
  NCheckboxGroup,
  NButton,
  NImage,
  NTag,
  useMessage,
  NFormItem,
  NSpace,
  NRadioGroup,
  NRadio,
  NInput
} from 'naive-ui';
import {
  AddUser,
  DeleteUser,
  GetAllRole,
  GetUserListFun,
  GetUserListFunByName,
  PostUpdateUserRole,
  UpdateUserInfoById,
  UpdateUserPassDefault
} from '@/api/AxiosFun';
import { DataTable } from '@/utils';
import { AddUserType, UserType } from '@/api/Result';
import { GetUserData } from '@/utils/data/ResultDataTable';

const rules = ref({
  user: {
    name: {
      required: true,
      message: '请输入姓名',
      trigger: 'blur'
    },
    emile: {
      required: true,
      message: '请输入邮箱',
      trigger: ['input', 'blur']
    }
  }
});
const formValue = ref({
  user: {
    name: '',
    emile: ''
  },
  radioGroupValue: ''
});
const AddFlag = ref(false);
const searchValue = ref('');
const cities = ref<number[]>([]);
const showFlag = ref(false);
const checkBoxValue = ref(['']);
const AllRoleDate = ref<Map<number, string>>();
const rowKeyNow = ref(0);
const showModalPass = ref(false);
const message = useMessage();
const AllUserInfo = ref<UserType>();
const editFlag = ref(false);
const deleteFlag = ref(false);
const checkedUsername = ref('');
const updateTitle = computed(() => {
  return `是否重置[${checkedUsername.value}]的密码`;
});
const deleteInfo = computed(() => {
  return `是否删除用户:[${checkedUsername.value}]?`;
});
function addUser() {
  formValue.value.user.emile = '';
  formValue.value.user.name = '';
  formValue.value.radioGroupValue = '';
  AddFlag.value = true;
}
function onNegativeClick() {
  showModalPass.value = false;
}
async function AddUsers() {
  if (formValue.value.user.name !== '' && formValue.value.user.emile !== '' && formValue.value.radioGroupValue !== '') {
    const userData: AddUserType = {
      username: formValue.value.user.name,
      email: formValue.value.user.emile,
      status: formValue.value.radioGroupValue
    };
    const res = await AddUser(userData);
    if (res === '新增用户成功了') {
      message.success(res);
      await testDate();
      AddFlag.value = false;
    } else {
      message.error('新增用户失败了');
    }
  } else {
    message.error('请完善新增表单中的信息');
  }
}

function revoke() {
  editFlag.value = false;
}
function GoBack() {
  AddFlag.value = false;
}

async function DeleteChecked() {
  const userId = [];
  userId.push(rowKeyNow.value);
  const DeleteInfo = await DeleteUser(userId);
  if (DeleteInfo === '成功操作了捏') {
    message.success(DeleteInfo);
    await testDate();
    deleteFlag.value = false;
  } else {
    message.error(DeleteInfo || '操作失败了');
  }
}
function RevokeDelete() {
  deleteFlag.value = false;
}

async function GetEdit() {
  const userData = GetUserData(rowKeyNow.value, AllUserInfo.value as UserType);
  if (formValue.value.user.name !== '') {
    userData.username = formValue.value.user.name;
  }
  if (formValue.value.user.emile !== '') {
    userData.email = formValue.value.user.emile;
  }
  if (formValue.value.radioGroupValue !== '') {
    userData.status = formValue.value.radioGroupValue;
  }
  const infoById = await UpdateUserInfoById(userData);
  if (infoById === '操作成功了捏') {
    message.success(infoById);
    await testDate();
    editFlag.value = false;
  } else {
    message.error(infoById || '操作失败了');
  }
}

async function onPositiveClick() {
  const res = await UpdateUserPassDefault(rowKeyNow.value);
  if (res === '重置密码成功了捏') {
    message.success(res);
    showModalPass.value = false;
  } else {
    message.error(res);
  }
}
const data = ref();

const subLine = async (key: number) => {
  const UpdateUserRole = await PostUpdateUserRole(key, cities.value);
  if (UpdateUserRole !== '操作成功了捏') {
    message.error('接口调用失败');
  } else {
    message.success(UpdateUserRole);
    showFlag.value = !showFlag.value;
    await testDate();
  }
};
const handleUpdateValue = (value: any) => {
  cities.value = value;
};
const pagination = ref({
  pageSize: 8
});
onMounted(async () => {
  await testDate();
});
async function testDate() {
  const res = await GetUserListFun();
  AllUserInfo.value = res;
  data.value = DataTable(res);
}

async function GetUserListByName() {
  const res = await GetUserListFunByName(searchValue.value);
  AllUserInfo.value = res;
  data.value = DataTable(res);
}

// 创建数据表格模板
const createColumns = ({ sendMail }: any) => {
  return [
    {
      type: 'selection',
      fixed: 'left'
    },
    {
      title: '用户名',
      key: 'username',
      align: 'center'
    },
    {
      title: '头像',
      key: 'avatar',
      align: 'center',
      render(row: { avatar: string[] }) {
        return row.avatar.map((url: string) => {
          return h(NImage, {
            style: {
              marginRight: '6px',
              width: '40px',
              height: '40px',
              borderRadius: '50%'
            },
            src: url
          });
        });
      }
    },
    {
      title: '权限列表',
      key: 'role_name',
      align: 'center',
      render(row: { role_name: string[] }) {
        return row.role_name.map((tagKey: any) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'info'
            },
            {
              default: () => tagKey
            }
          );
        });
      }
    },
    {
      title: '创建时间',
      key: 'created',
      align: 'center'
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      render(row: { status: string[] }) {
        let value = '';
        // eslint-disable-next-line consistent-return,array-callback-return
        return row.status.map((tagKey: string) => {
          switch (tagKey) {
            case '1':
              value = '激活';
              return h(
                NTag,
                {
                  style: {
                    marginRight: '6px'
                  },
                  type: 'success'
                },
                {
                  default: () => value
                }
              );
            case '0':
              value = '未激活';
              return h(
                NTag,
                {
                  style: {
                    marginRight: '6px'
                  },
                  type: 'warning'
                },
                {
                  default: () => value
                }
              );
            default:
              break;
          }
        });
      }
    },
    {
      title: '邮箱',
      key: 'email',
      align: 'center'
    },
    {
      title: '操作',
      key: 'set',
      align: 'center',
      render(row: { set: string[]; key: number; role_name: string[]; username: string }) {
        return row.set.map((key: string) => {
          return h(
            NButton,
            {
              size: 'small',
              style: {
                marginRight: '6px'
              },
              onClick: () => sendMail(key, row.key, row.role_name, row.username)
            },
            { default: () => key }
          );
        });
      }
    }
  ];
};

const columns = createColumns({
  async sendMail(key: string, rowKey: number, roleArr: string[], username: string) {
    rowKeyNow.value = rowKey;
    checkedUsername.value = username;
    if (key === '分配角色') {
      checkBoxValue.value = roleArr;
      cities.value = [];
      const role = await GetAllRole();
      const roleArray = new Map<number, string>();
      role.forEach(e => {
        if (checkBoxValue.value.includes(e.name)) {
          cities.value.push(e.id);
        }
        roleArray.set(e.id, e.name);
      });
      AllRoleDate.value = roleArray;
      showFlag.value = !showFlag.value;
    }
    if (key === '重置密码') {
      showModalPass.value = true;
    }
    if (key === '编辑') {
      formValue.value.user.emile = '';
      formValue.value.user.name = '';
      formValue.value.radioGroupValue = '';
      editFlag.value = true;
    }
    if (key === '删除') {
      deleteFlag.value = true;
    }
  }
});
</script>

<style scoped></style>
