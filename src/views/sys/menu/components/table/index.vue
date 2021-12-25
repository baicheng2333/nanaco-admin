<template>
  <n-data-table :columns="columns" :data="data" :max-height="670" />
  <NModal
    v-model:show="EditFlag"
    class="custom-card"
    preset="card"
    style="width: 600px"
    title="编辑角色"
    size="huge"
    :bordered="false"
    :segmented="{
      content: 'soft',
      footer: 'soft'
    }"
  >
    <template #header-extra>编辑菜单信息</template>
    <n-space vertical>
      <NForm ref="formRef" :model="formValue" :label-width="60" :rules="rules" label-placement="left">
        <n-form-item label="上级菜单" path="multipleSelectValue">
          <n-select v-model:value="formValue.SelectValue" :options="optionsString" :consistent-menu-width="true" />
        </n-form-item>
        <n-form-item label="菜单名称" path="menuName">
          <n-input v-model:value="formValue.menuName"></n-input>
        </n-form-item>
        <n-form-item label="权限编码" path="codeName">
          <n-input v-model:value="formValue.codeName"></n-input>
        </n-form-item>
        <n-form-item label="图标">
          <n-input v-model:value="formValue.icon"></n-input>
        </n-form-item>
        <n-form-item label="菜单url">
          <n-input v-model:value="formValue.url"></n-input>
        </n-form-item>
        <n-form-item label="菜单组件">
          <n-input v-model:value="formValue.components"></n-input>
        </n-form-item>
        <n-form-item label="类型" path="radioGroupValue">
          <n-radio-group v-model:value="formValue.radioGroupValue" name="radioGroupValue">
            <n-space>
              <n-radio value="0">目录</n-radio>
              <n-radio value="1">菜单</n-radio>
              <n-radio value="2">按钮</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="状态" path="radioGroupValue">
          <n-radio-group v-model:value="formValue.radioGroupValueStatus" name="radioGroupValueStatus">
            <n-space>
              <n-radio value="0">禁用</n-radio>
              <n-radio value="1">正常</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="排序号" path="inputNumberValue">
          <n-input-number v-model:value="formValue.inputNumberValue" clearable />
        </n-form-item>
      </NForm>
    </n-space>

    <template #footer>
      <NSpace justify="end">
        <NButton @click="Chancel">取消</NButton>
        <NButton @click="sure">确定</NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<script setup lang="ts">
import { h, onMounted, ref } from 'vue';
import {
  NDataTable,
  NTag,
  NButton,
  useMessage,
  NForm,
  NModal,
  NSpace,
  NSelect,
  NFormItem,
  NInput,
  NRadioGroup,
  NRadio,
  NInputNumber
} from 'naive-ui';
import { GetMenuList, UpdateMenuFun } from '@/api/AxiosFun';
import { GetParentsType, MenuDataType, MenuList } from '@/api/Result';

const data = ref();
const EditFlag = ref(false);
const formValue = ref({
  SelectValue: '',
  menuName: '',
  codeName: '',
  icon: '',
  url: '',
  components: '',
  radioGroupValue: '',
  radioGroupValueStatus: '',
  inputNumberValue: 0
});
const rowId = ref();
const dataToId = ref<MenuDataType[]>([]);
const options = ref<number[]>([]);
const optionsString = ref<GetParentsType[]>([]);
const rules = ref({
  multipleSelectValue: {
    required: true,
    trigger: ['blur'],
    message: '请选择'
  },
  menuName: {
    required: true,
    trigger: ['blur'],
    message: '请填写'
  },
  codeName: {
    required: true,
    trigger: ['blur'],
    message: '请填写'
  },
  radioGroupValue: {
    required: true,
    trigger: ['blur'],
    message: '选择'
  },
  inputNumberValue: {
    type: 'number',
    required: true,
    trigger: ['blur'],
    message: '请输入'
  }
});
const message = useMessage();
onMounted(async () => {
  await GetData();
  GetAllParents();
});
function IsValue() {
  return (
    formValue.value.SelectValue != null &&
    formValue.value.menuName !== '' &&
    formValue.value.codeName !== '' &&
    formValue.value.radioGroupValueStatus !== '' &&
    formValue.value.radioGroupValue !== '' &&
    formValue.value.inputNumberValue != null
  );
}

function Chancel() {
  EditFlag.value = false;
}
async function sure() {
  if (IsValue()) {
    const s = await UpdateMenuFun(formValue.value, rowId.value);
    if (s === '修改成功!') {
      message.success(s);
      await GetData();
      GetAllParents();
      EditFlag.value = false;
    } else {
      message.error(s);
    }
  }
}
async function GetData() {
  const navTypes = await GetMenuList();
  data.value = NavToData(navTypes);
}
/** 返回所有的父级名字 */
function GetAllParents() {
  /** 先拿到所有的父id */
  dataToId.value.forEach(e => {
    if (options.value.indexOf(e.parentId) === -1) {
      options.value.push(e.parentId);
    }
  });
  /** 再根据所有的id进行姓名转换 */
  const dataNow: GetParentsType[] = [];
  options.value.forEach(e => {
    const parent = GetParent(e);
    dataNow.push({
      label: parent,
      value: String(e)
    });
  });
  optionsString.value = dataNow;
}
/** 根据key的id返回父级的名字 */
function GetParent(key: number) {
  let value = '';
  if (key === 0) {
    value = '根目录';
  } else {
    dataToId.value.forEach(e => {
      if (e.key === key) {
        value = e.name;
      }
    });
  }
  return value;
}
function NavToData(res: MenuList[]) {
  const dataType: MenuDataType[] = [];
  res.forEach(e => {
    const dataMenu: MenuDataType = {
      key: e.id,
      name: e.name,
      code: e.perms,
      icon: e.icon,
      type: String(e.type),
      URL: e.path,
      components: e.component,
      sort: e.orderNum,
      status: String(e.status),
      parentId: e.parentId,
      set: ['编辑', '删除'],
      children: []
    };
    dataToId.value.push(dataMenu);
    if (e.child) dataMenu.children = NavToData(e.child);
    dataType.push(dataMenu);
  });
  return dataType;
}

// 创建数据表格模板
const createColumns = ({ sendMail }: any) => {
  return [
    {
      type: 'selection'
    },
    {
      title: '名称',
      key: 'name',
      align: 'center'
    },
    {
      title: '权限编码',
      key: 'code',
      align: 'center'
    },
    {
      title: '图标',
      key: 'icon',
      align: 'center'
    },
    {
      title: '类型',
      key: 'type',
      align: 'center',
      render(row: { type: string }) {
        return TagTypeSet(row.type);
      }
    },
    {
      title: '菜单URL',
      key: 'URL',
      align: 'center'
    },
    {
      title: '菜单组件',
      key: 'components',
      align: 'center'
    },
    {
      title: '排序号',
      key: 'sort',
      align: 'center'
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      render(row: { status: string }) {
        return StatusSet(row.status);
      }
    },
    {
      title: '操作',
      key: 'set',
      align: 'center',
      render(row: { set: string[] }) {
        return row.set.map((rowKey: string) => {
          return h(
            NButton,
            {
              size: 'small',
              style: {
                marginRight: '6px'
              },
              onClick: () => sendMail(row, rowKey)
            },
            { default: () => rowKey }
          );
        });
      }
    }
  ];
};

function StatusSet(status: string) {
  let value = '';
  switch (status) {
    case '1':
      value = '正常';
      return h(
        NTag,
        {
          size: 'small',
          type: 'success'
        },
        {
          default: () => value
        }
      );
    case '0':
      value = '禁用';
      return h(
        NTag,
        {
          size: 'small',
          type: 'error'
        },
        {
          default: () => value
        }
      );
    default:
      break;
  }
}
function TagTypeSet(status: string) {
  let value = '';
  switch (status) {
    case '0':
      value = '目录';
      return h(
        NTag,
        {
          size: 'small',
          type: 'success'
        },
        {
          default: () => value
        }
      );
    case '1':
      value = '菜单';
      return h(
        NTag,
        {
          size: 'small',
          type: 'info'
        },
        {
          default: () => value
        }
      );
    case '2':
      value = '按钮';
      return h(
        NTag,
        {
          size: 'small',
          type: 'warning'
        },
        {
          default: () => value
        }
      );
    default:
      break;
  }
}
function GetParKey(key: number) {
  let value = 0;
  dataToId.value.forEach(e => {
    if (key === e.key) {
      value = e.parentId;
    }
  });
  return value;
}
const columns = createColumns({
  sendMail(
    rowData: {
      key: number;
      name: string;
      code: string;
      icon: string;
      URL: string;
      components: string;
      type: string;
      status: string;
      sort: number;
    },
    rowKey: string
  ) {
    rowId.value = rowData.key;
    formValue.value.SelectValue = String(GetParKey(rowData.key));
    formValue.value.menuName = rowData.name;
    formValue.value.codeName = rowData.code;
    formValue.value.icon = rowData.icon;
    formValue.value.url = rowData.URL;
    formValue.value.components = rowData.components;
    formValue.value.radioGroupValue = rowData.type;
    formValue.value.radioGroupValueStatus = rowData.status;
    formValue.value.inputNumberValue = rowData.sort;
    if (rowKey === '编辑') {
      EditFlag.value = true;
    }
  }
});
</script>

<style scoped></style>
