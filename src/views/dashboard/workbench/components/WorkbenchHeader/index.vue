<template>
  <n-card :bordered="false" class="rounded-16px shadow-sm">
    <div class="flex-y-center justify-between">
      <div class="flex-y-center">
        <img :src="auth.userInfo.avatar" alt="" class="w-70px h-70px" style="border-radius: 50%" />
        <div class="pl-12px">
          <h3 class="text-18px font-semibold">早安,{{ auth.userInfo.username }}, 今天又是摆烂的一天！</h3>
          <p class="leading-30px text-[#999]">如果你愿意的话，让我带您去吧，这座小镇，愿望实现的地方…</p>
        </div>
      </div>
      <n-space :size="24" :wrap="false">
        <n-statistic v-for="item in statisticData" :key="item.id" class="whitespace-nowrap" v-bind="item"></n-statistic>
      </n-space>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NSpace, NStatistic } from 'naive-ui';
import { onMounted } from 'vue';
import { useAuthStore } from '@/store';
import { getToken } from '@/utils';
import { GetUserInfo } from '@/api/AxiosFun';
import { UserInfo } from '@/interface';
import { useRouterPush } from '@/composables';

const { routerPush } = useRouterPush();
interface StatisticData {
  id: number;
  label: string;
  value: string;
}
const auth = useAuthStore();
onMounted(async () => {
  if (auth.GetterUserInfo.username === '' && getToken() != null) {
    const userInfo = await GetUserInfo();
    auth.setUserInfoAuthState(userInfo as unknown as UserInfo);
  } else {
    routerPush('/login');
  }
});
const statisticData: StatisticData[] = [
  {
    id: 0,
    label: '项目数',
    value: '25'
  },
  {
    id: 1,
    label: '待办',
    value: '4/16'
  },
  {
    id: 2,
    label: '消息',
    value: '12'
  }
];
</script>
<style scoped></style>
