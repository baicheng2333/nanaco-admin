<template>
  <n-grid :item-responsive="true" responsive="screen" :x-gap="16" :y-gap="16">
    <n-grid-item span="s:24 m:16">
      <n-space :vertical="true" :size="16">
        <n-card title="项目主要技术栈" :bordered="false" size="small" class="shadow-sm rounded-16px">
          <template #header-extra>
            <a class="text-primary" href="javascript:;">更多技术栈</a>
          </template>
          <n-grid :item-responsive="true" responsive="screen" cols="m:2 l:3" :x-gap="8" :y-gap="8">
            <n-grid-item v-for="item in technology" :key="item.id">
              <technology-card v-bind="item" />
            </n-grid-item>
          </n-grid>
        </n-card>
        <n-card title="动态" :bordered="false" size="small" class="shadow-sm rounded-16px">
          <template #header-extra>
            <a class="text-primary" href="javascript:;">更多动态</a>
          </template>
          <n-list>
            <n-list-item v-for="item in activity" :key="item.id">
              <template #prefix>
                <div class="w-48px h-48px">
                  <img src="@/assets/svg/avatar/avatar01.svg" alt="" class="wh-full" />
                </div>
              </template>
              <n-thing :title="item.content" :description="item.time" />
            </n-list-item>
          </n-list>
        </n-card>
      </n-space>
    </n-grid-item>
    <n-grid-item span="s:24 m:8">
      <n-space :vertical="true" :size="16">
        <n-card title="快捷操作" :bordered="false" size="small" class="shadow-sm rounded-16px">
          <n-grid :item-responsive="true" responsive="screen" cols="m:2 l:3" :x-gap="8" :y-gap="8">
            <n-grid-item v-for="item in shortcuts" :key="item.id">
              <shortcuts-card v-bind="item" />
            </n-grid-item>
          </n-grid>
        </n-card>
        <n-card title="创意" :bordered="false" size="small" class="shadow-sm rounded-16px">
          <n-carousel :autoplay="true" :show-arrow="true">
            <banner-svg type="1" />
            <banner-svg type="2" />
            <banner-svg type="3" />
          </n-carousel>
        </n-card>
      </n-space>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { NGrid, NGridItem, NSpace, NCard, NList, NListItem, NThing, NCarousel } from 'naive-ui';
import { BannerSvg } from '@/components';
import { TechnologyCard, ShortcutsCard } from './components';

interface Technology {
  id: number;
  name: string;
  description: string;
  author: string;
  site: string;
  icon: string;
  iconColor?: string;
}

interface Activity {
  id: number;
  content: string;
  time: string;
}

interface Shortcuts {
  id: number;
  label: string;
  icon: string;
  iconColor: string;
}

const technology: Technology[] = [
  {
    id: 0,
    name: 'Vue',
    description: '一套用于构建用户界面的渐进式框架',
    author: '尤雨溪 - Evan You',
    site: 'https://v3.cn.vuejs.org/',
    icon: 'vscode-icons:file-type-vue'
  },
  {
    id: 1,
    name: 'TypeScript',
    description: 'JavaScript类型的超集，它可以编译成纯JavaScript',
    author: '微软 - Microsoft',
    site: 'https://www.typescriptlang.org/',
    icon: 'vscode-icons:file-type-typescript-official'
  },
  {
    id: 2,
    name: 'Vite',
    description: '下一代前端开发与构建工具',
    author: '尤雨溪 - Evan You',
    site: 'https://vitejs.cn/',
    icon: 'vscode-icons:file-type-vite'
  },
  {
    id: 3,
    name: 'NaiveUI',
    description: '一个 Vue 3 组件库',
    author: '图森未来 - TuSimple',
    site: 'https://www.naiveui.com/zh-CN/os-theme',
    icon: 'mdi:alpha-n-box-outline',
    iconColor: '#5fbc22'
  },
  {
    id: 4,
    name: 'WindiCSS',
    description: '下一代实用优先的CSS框架',
    author: 'Windicss',
    site: 'https://windicss.org/',
    icon: 'file-icons:windi',
    iconColor: '#48b0f1'
  },
  {
    id: 5,
    name: 'Pinia',
    description: 'vue状态管理框架，支持vue2、vue3',
    author: 'Posva',
    site: 'https://pinia.esm.dev/',
    icon: 'mdi:fruit-pineapple',
    iconColor: '#fecf48'
  }
];

const activity: Activity[] = [
  { id: 0, content: '这里是存放日志的地方,后端暂时没时间写接口，死数据将就下吧', time: '2021-05-28 22:22:22' }
];

const shortcuts: Shortcuts[] = [
  { id: 0, label: '主控台', icon: 'mdi:desktop-mac-dashboard', iconColor: '#409eff' },
  { id: 1, label: '系统管理', icon: 'ic:outline-settings', iconColor: '#7238d1' },
  { id: 2, label: '权限管理', icon: 'mdi:family-tree', iconColor: '#f56c6c' },
  { id: 3, label: '组件', icon: 'fluent:app-store-24-filled', iconColor: '#19a2f1' },
  { id: 4, label: '表格', icon: 'mdi:table-large', iconColor: '#fab251' },
  { id: 5, label: '图表', icon: 'mdi:chart-areaspline', iconColor: '#8aca6b' }
];
</script>
<style scoped></style>
