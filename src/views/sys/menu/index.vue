<script setup lang="ts">
import { NCard } from 'naive-ui';
import { DataTable, SearchTable } from '@/views/sys/menu/components';
</script>
<template>
  <n-card title="菜单管理界面" class="h-full shadow-sm rounded-16px">
    <SearchTable></SearchTable>
    <DataTable></DataTable>
  </n-card>
</template>

<style></style>
