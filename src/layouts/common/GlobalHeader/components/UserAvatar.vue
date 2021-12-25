<template>
  <n-dropdown :options="options" @select="handleDropdown">
    <hover-container class="px-12px">
      <img :src="auth.userInfo.avatar" class="w-32px h-32px" />
      <span class="pl-8px text-16px font-medium">{{ auth.userInfo.username }}</span>
    </hover-container>
  </n-dropdown>
</template>

<script lang="ts" setup>
import { NDropdown, useDialog } from 'naive-ui';
import { onMounted } from 'vue';
import { HoverContainer } from '@/components';
import { useRouterPush } from '@/composables';
import { getToken, iconifyRender, resetAuthStorage } from '@/utils';
import { useAuthStore } from '@/store';
import { GetUserInfo } from '@/api/AxiosFun';
import { UserInfo } from '@/interface';

const { routerPush } = useRouterPush();
const auth = useAuthStore();
type DropdownKey = 'user-center' | 'logout';

const { toLogin } = useRouterPush();
const dialog = useDialog();

onMounted(async () => {
  if (auth.GetterUserInfo.username === '' && getToken() != null) {
    const userInfo = await GetUserInfo();
    auth.setUserInfoAuthState(userInfo as unknown as UserInfo);
  } else {
    routerPush('/login');
  }
});

const options = [
  {
    label: '用户中心',
    key: 'user-center',
    icon: iconifyRender('carbon:user-avatar')
  },
  {
    type: 'divider',
    key: 'divider'
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: iconifyRender('carbon:logout')
  }
];

function handleDropdown(optionKey: string) {
  const key = optionKey as DropdownKey;
  if (key === 'logout') {
    dialog.info({
      title: '提示',
      content: '您确定要退出登录吗？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        resetAuthStorage();
        toLogin();
      }
    });
  }
}
</script>
<style scoped></style>
