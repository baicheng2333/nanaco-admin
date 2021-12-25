<template>
  <n-message-provider>
    <app-provider>
      <router-view />
    </app-provider>
  </n-message-provider>
</template>

<script lang="ts" setup>
import { NMessageProvider } from 'naive-ui';
import AppProvider from './AppProvider.vue';
</script>
<style></style>
