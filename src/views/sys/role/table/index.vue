<template>
  <NSpace style="margin-bottom: 20px">
    <n-input v-model:value="searchValue" placeholder="请输入角色名"></n-input>
    <NButton @click="GetRoleListByName">搜索</NButton>
    <NButton @click="addRole">新增</NButton>
  </NSpace>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" @update:checked-row-keys="handleCheck" />
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    style="width: 600px"
    title="权限分配"
    size="huge"
    :bordered="false"
    :segmented="{
      content: 'soft',
      footer: 'soft'
    }"
    @update:show="showClose"
  >
    <template #header-extra>权限分配</template>
    <n-tree
      block-line
      checkable
      :data="TreeData"
      :checked-keys="defaultCheckedKeys"
      :default-expand-all="true"
      @update:checked-keys="updateCheckedKeys"
    />
    <template #footer>
      <NSpace justify="end">
        <NButton @click="chancel">取消</NButton>
        <NButton @click="sureClick">确定</NButton>
      </NSpace>
    </template>
  </n-modal>

  <n-modal
    v-model:show="showAddInfo"
    class="custom-card"
    preset="card"
    style="width: 600px"
    title="添加"
    size="huge"
    :bordered="false"
    :segmented="{
      content: 'soft',
      footer: 'soft'
    }"
  >
    <template #header-extra>添加角色</template>
    <NForm :label-width="160" :model="formAddValue" :rules="AddRules" size="medium">
      <n-form-item label="角色名" path="name">
        <n-input v-model:value="formAddValue.name" placeholder="角色名字" />
      </n-form-item>
      <n-form-item label="唯一编码" path="code">
        <n-input v-model:value="formAddValue.code" placeholder="唯一编码" />
      </n-form-item>
      <n-form-item label="描述" path="remark">
        <n-input v-model:value="formAddValue.remark" placeholder="描述" />
      </n-form-item>
      <n-radio-group v-model:value="formAddValue.status">
        <NSpace justify="start" size="large">
          <n-radio value="1">正常</n-radio>
          <n-radio value="0">禁用</n-radio>
        </NSpace>
      </n-radio-group>
    </NForm>
    <template #footer>
      <NSpace justify="end">
        <NButton @click="AddChancelExit">取消</NButton>
        <NButton @click="AddSureClickExit">确定</NButton>
      </NSpace>
    </template>
  </n-modal>

  <n-modal
    v-model:show="showInfo"
    class="custom-card"
    preset="card"
    style="width: 600px"
    title="编辑"
    size="huge"
    :bordered="false"
    :segmented="{
      content: 'soft',
      footer: 'soft'
    }"
  >
    <template #header-extra>编辑</template>
    <NForm :label-width="160" :model="formValue" :rules="rules" size="medium">
      <n-form-item label="角色名" path="name">
        <n-input v-model:value="formValue.name" placeholder="角色名字" />
      </n-form-item>
      <n-form-item label="唯一编码" path="code">
        <n-input v-model:value="formValue.code" placeholder="唯一编码" />
      </n-form-item>
      <n-form-item label="描述" path="remark">
        <n-input v-model:value="formValue.remark" placeholder="描述" />
      </n-form-item>
      <n-radio-group v-model:value="formValue.status">
        <NSpace justify="start" size="large">
          <n-radio value="1">正常</n-radio>
          <n-radio value="0">禁用</n-radio>
        </NSpace>
      </n-radio-group>
    </NForm>
    <template #footer>
      <NSpace justify="end">
        <NButton @click="chancelExit">取消</NButton>
        <NButton @click="sureClickExit">确定</NButton>
      </NSpace>
    </template>
  </n-modal>

  <n-modal
    v-model:show="deleteFlag"
    preset="dialog"
    title="确认"
    :content="DeleteInfo"
    positive-text="确认"
    negative-text="算了"
    @positive-click="submitCallback"
    @negative-click="cancelCallback"
  />
</template>

<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue';
import {
  NDataTable,
  NModal,
  NTag,
  NButton,
  NSpace,
  useMessage,
  NTree,
  NForm,
  NFormItem,
  NInput,
  NRadioGroup,
  NRadio
} from 'naive-ui';
import {
  AddRole,
  DeleteRoleInfo,
  GetAllRole,
  GetAllRoleByName,
  GetMenuList,
  GetRoleInfoList,
  SetRolePerm,
  UpdateRoleList
} from '@/api/AxiosFun';
import { MenuList, Role, RoleDataType, RoleInfo, Tree } from '@/api/Result';

const searchValue = ref('');
const message = useMessage();
const deleteFlag = ref(false);
const showModal = ref(false);
const showInfo = ref(false);
const TreeData = ref<Tree[]>([]);
const rowNow = ref(0);
const defaultCheckedKeys = ref<string[]>([]);
const showAddInfo = ref(false);
const rules = ref({
  name: {
    required: true,
    message: '请输入名字',
    trigger: 'blur'
  },
  code: {
    required: true,
    message: '请输入唯一编码',
    trigger: 'blur'
  },
  remark: {
    required: true,
    message: '请输入描述',
    trigger: 'blur'
  }
});
const AddRules = ref({
  name: {
    required: true,
    message: '请输入名字',
    trigger: 'blur'
  },
  code: {
    required: true,
    message: '请输入唯一编码',
    trigger: 'blur'
  },
  remark: {
    required: true,
    message: '请输入描述',
    trigger: 'blur'
  }
});
const formValue = ref({
  name: '',
  code: '',
  remark: '',
  status: ''
});
const formAddValue = ref({
  name: '',
  code: '',
  remark: '',
  status: ''
});
const data = ref<RoleDataType[]>();
const RowData = ref<RoleInfo>({
  id: 0,
  created: '',
  updated: '',
  status: '',
  name: '',
  code: '',
  remark: '',
  menuIds: []
});
const checkedRowKeysRef = ref([0]);
const checkedName = ref('');
const DeleteInfo = computed(() => {
  return `你确认删除[${checkedName.value}]这个角色吗`;
});
const pagination = ref({
  pageSize: 8
});
function AddChancelExit() {
  showAddInfo.value = false;
}
async function AddSureClickExit() {
  if (formAddValue.value.name !== '' && formAddValue.value.code !== '' && formAddValue.value.remark !== '') {
    const Add = await AddRole(formAddValue.value);
    if (Add === '添加成功') {
      await GetRoleData();
      showAddInfo.value = false;
    }
  } else {
    message.error('请按照规则填写表单');
  }
}
function addRole() {
  showAddInfo.value = true;
}
async function GetRoleListByName() {
  await GetRoleByName();
}
async function sureClickExit() {
  RowData.value.name = formValue.value.name;
  RowData.value.code = formValue.value.code;
  RowData.value.remark = formValue.value.remark;
  RowData.value.status = formValue.value.status;
  const value = await UpdateRoleList(RowData.value);
  if (value === '修改成功了') {
    message.success(value);
    await GetRoleData();
    showInfo.value = false;
  } else {
    message.error(value);
  }
}
async function submitCallback() {
  const info = await DeleteRoleInfo([rowNow.value]);
  if (info === '删除成功') {
    message.success(info);
    await GetRoleData();
    deleteFlag.value = false;
  }
}
function cancelCallback() {
  deleteFlag.value = false;
}
function chancelExit() {
  showInfo.value = false;
}
function showClose() {
  defaultCheckedKeys.value = [];
}
function updateCheckedKeys(v: string[]) {
  defaultCheckedKeys.value = v;
}
function handleCheck(rowKeys: number[]) {
  checkedRowKeysRef.value = rowKeys;
}
onMounted(async () => {
  await GetRoleData();
});
async function GetRoleByName() {
  const byName = await GetAllRoleByName(searchValue.value);
  data.value = GetData(byName);
}

async function GetRoleData() {
  const roles = await GetAllRole();
  data.value = GetData(roles);
}
async function sureClick() {
  const rolePerm = await SetRolePerm(rowNow.value, defaultCheckedKeys.value.map(Number));
  defaultCheckedKeys.value = rolePerm.map(String);
  showModal.value = false;
}
function chancel() {
  showModal.value = false;
}
function GetData(data: Role[]) {
  const role: RoleDataType[] = [];
  if (data.length > 0) {
    data.forEach(e => {
      role.push({
        key: e.id,
        name: e.name,
        code: e.code,
        remark: e.remark,
        status: String(e.status),
        set: ['分配权限', '编辑', '删除']
      });
    });
  }
  return role;
}

function TagsGet(status: string) {
  let value = '';
  switch (status) {
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
    default:
      break;
  }
}
// 创建数据表格模板
const createColumns = ({ sendMail }: any) => {
  return [
    {
      type: 'selection',
      fixed: 'left'
    },
    {
      title: '名称',
      key: 'name',
      align: 'center'
    },
    {
      title: '唯一编码',
      key: 'code',
      align: 'center'
    },
    {
      title: '描述',
      key: 'remark'
    },
    {
      title: '状态',
      key: 'status',
      render(row: { status: string }) {
        return TagsGet(row.status);
      }
    },
    {
      title: '操作',
      key: 'set',
      align: 'center',
      render(row: { set: string[]; key: number }) {
        return row.set.map((key: string) => {
          return h(
            NButton,
            {
              size: 'small',
              style: {
                marginRight: '6px'
              },
              onClick: () => sendMail(row, key, row.key)
            },
            { default: () => key }
          );
        });
      }
    }
  ];
};
async function RoleList() {
  const navTypes = await GetMenuList();
  TreeData.value = NavToRoleList(navTypes);
}
// 第二层转换
function GetChildren(tree: MenuList[]) {
  const value: Tree[] = [];
  tree.forEach(e => {
    const s: Tree = {
      key: String(e.id),
      label: e.name
    };
    if (e.child) s.children = GetChildren(e.child);
    value.push(s);
  });
  return value;
}
function NavToRoleList(res: MenuList[]) {
  const Value: Tree[] = [];
  // 第一层转换
  res.forEach(e => {
    const tree: Tree = {
      key: String(e.id),
      label: e.name
    };
    if (e.child) {
      tree.children = GetChildren(e.child);
    }
    Value.push(tree);
  });
  return Value;
}
async function GetRoleInfoListTo(key: string) {
  const infoList = await GetRoleInfoList(key);
  infoList.menuIds.forEach(e => {
    defaultCheckedKeys.value.push(String(e));
  });
}
async function GetRoleInfoTo(key: string) {
  const roleInfo = await GetRoleInfoList(key);
  RowData.value = roleInfo;
  formValue.value = {
    name: roleInfo.name,
    code: roleInfo.code,
    status: roleInfo.status,
    remark: roleInfo.remark
  };
}
const columns = createColumns({
  sendMail(rowData: { name: string; key: number }, key: string) {
    rowNow.value = rowData.key;
    checkedName.value = rowData.name;
    if (key === '分配权限') {
      RoleList();
      GetRoleInfoListTo(String(rowData.key));
      showModal.value = true;
    }
    if (key === '编辑') {
      GetRoleInfoTo(String(rowNow.value));
      showInfo.value = true;
    }
    if (key === '删除') {
      deleteFlag.value = true;
    }
  }
});
</script>

<style scoped></style>
