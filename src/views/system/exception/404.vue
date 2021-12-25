<template>
  <div class="flex-center flex-col wh-full">
    <ExceptionSvg type="404" :color="theme.themeColor" />
    <router-link to="/">
      <NButton type="primary">回到首页</NButton>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';
import { ExceptionSvg } from '@/components';
import { useThemeStore } from '@/store';

const theme = useThemeStore();
</script>
<style scoped></style>
