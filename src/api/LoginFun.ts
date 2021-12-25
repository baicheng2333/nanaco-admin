import axios from 'axios';
import { setToken } from '@/utils';

export async function AxiosGetUserLogin(Params: { password: string; code: string; username: string; token: string }) {
  const url = `http://192.168.2.25:8082/login?username=${Params.username}&password=${Params.password}&token=${Params.token}&code=${Params.code}`;
  axios
    .post(url)
    .then(e => {
      if (e.data.data === '成功') {
        setToken(e.headers.authorization);
      }
    })
    .catch(() => {});
}
