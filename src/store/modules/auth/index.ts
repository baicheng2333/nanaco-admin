import { defineStore } from 'pinia';
import { store } from '@/store';
import { removeToken } from '@/utils';
import type { UserInfo } from '@/interface';

interface AuthState {
  /** 用户token */
  token: string;
  /** 用户信息 */
  userInfo: UserInfo;
}

const authStore = defineStore({
  /** 区分不通状态的唯一标识 */
  id: 'auth-store',
  /** 状态 */
  state: (): AuthState => {
    return {
      token: '',
      userInfo: {
        id: '',
        username: '',
        avatar: ''
      }
    };
  },
  getters: {
    /** 是否登录 */
    isLogin: state => Boolean(state.token),
    GetterUserInfo: state => state.userInfo
  },
  actions: {
    /** 重置auth状态 */
    resetAuthState() {
      removeToken();
      this.$reset();
    },
    setUserInfoAuthState(NewState: UserInfo) {
      this.userInfo = NewState;
    }
  }
});

export default function useAuthStore() {
  return authStore(store);
}
