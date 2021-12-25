import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { store } from '@/store';

// 用户鉴权菜单
interface MenuList {
  menu: RouteRecordRaw[];
}
const menuStore = defineStore({
  id: 'menu-store',
  state: (): MenuList => {
    return <MenuList>{
      menu: []
    };
  },
  getters: {
    /** 检测是否有菜单 */
    isHasMenu: state => Boolean(state.menu),
    GetterMenu: state => state.menu
  },
  actions: {
    setMenu(NewState: RouteRecordRaw[]) {
      this.menu = NewState;
    },
    addMenu(AddState: RouteRecordRaw) {
      this.menu.push(AddState);
    }
  }
});
export default function r() {
  return menuStore(store);
}
