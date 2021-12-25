<template>
  <div class="pt-24px">
    <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
      <NFormItem path="phone">
        <NInput v-model:value="model.phone" placeholder="手机号码" />
      </NFormItem>
      <NFormItem path="pwd">
        <NInput v-model:value="model.pwd" placeholder="密码" />
      </NFormItem>
      <NFormItem path="code">
        <NInput v-model:value="model.code" style="width: 50%; margin-right: 60px" placeholder="验证码" />
        <img :src="Captcha.imgUrl" alt="后端错误" @click="GetCaptcha" />
      </NFormItem>
      <NSpace :vertical="true" size="large">
        <div class="flex-y-center justify-between">
          <NCheckbox v-model:checked="rememberMe">记住我</NCheckbox>
        </div>
        <NButton type="primary" size="large" :block="true" :round="true" :loading="loading" @click="handleSubmit">
          确定
        </NButton>
      </NSpace>
    </NForm>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { NForm, NFormItem, NInput, NSpace, NCheckbox, NButton, useNotification } from 'naive-ui';
import type { FormInst, FormRules } from 'naive-ui';
import { useAuthStore } from '@/store';
import { useRouterPush, useRouteQuery } from '@/composables';
import { useLoading } from '@/hooks';
import { GetCaptchaFun, GetUserInfo } from '@/api/AxiosFun';
import { AxiosGetUserLogin } from '@/api/LoginFun';
import { CaptchaType } from '@/api/Result';

const notification = useNotification();
const auth = useAuthStore();

const { routerPush, toHome } = useRouterPush();
const { loginRedirectUrl } = useRouteQuery();
const { loading, startLoading, endLoading } = useLoading();
const Captcha = reactive({
  imgToken: '',
  imgUrl: ''
});
onMounted(() => {
  GetCaptcha();
});
const formRef = ref<(HTMLElement & FormInst) | null>(null);
const model = reactive({
  phone: 'admin',
  pwd: '111111',
  code: ''
});
const rules: FormRules = {
  phone: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入账号'
  },
  pwd: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入密码'
  },
  code: {
    required: true,
    trigger: ['blur', 'input'],
    message: '验证码不能为空'
  }
};
const rememberMe = ref(false);
// 获取验证码函数
async function GetCaptcha() {
  const res: CaptchaType = await GetCaptchaFun();
  Captcha.imgUrl = res.base64Img;
  Captcha.imgToken = res.key;
}

async function handleSubmit(e: MouseEvent) {
  if (!formRef.value) return;
  e.preventDefault();
  await AxiosGetUserLogin({
    username: model.phone,
    password: model.pwd,
    token: Captcha.imgToken,
    code: model.code
  });
  setTimeout(async () => {
    startLoading();
    notification.success({
      title: '登陆中',
      content: '正在登陆中捏',
      duration: 3000
    });
    const UserInfo = await GetUserInfo();
    if (UserInfo) {
      notification.success({
        title: '登录成功',
        content: `欢迎你:${auth.GetterUserInfo.username}`,
        duration: 3000
      });
      endLoading();
      if (loginRedirectUrl.value) {
        routerPush(loginRedirectUrl.value);
      } else {
        toHome();
      }
    } else {
      endLoading();
    }
  }, 1000);
}
</script>
<style scoped></style>
