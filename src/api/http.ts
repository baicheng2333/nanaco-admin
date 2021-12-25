import qs from 'qs';
import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method
} from 'axios';
import { ApiKeyDataType, ApiKeyType } from './api';

type ResultDataType = ApiKeyDataType[ApiKeyType];
/*
NewAxiosInstance接口得根据自己情况来定
  interceptors属性是必须要有，因为后续要用到拦截器
  至于<T = any>(config: AxiosRequestConfig): AxiosPromise<T>这一段代码，因为我后续二次封装axios时采用的是此类型，所以我这里
  声明的是这种数据类型
*/
interface NewAxiosInstance extends AxiosInstance {
  /*
    设置泛型T，默认为any，将请求后的结果返回变成AxiosPromise<T>
  */
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse<ResultDataType>>;
  };
}
// 基本的初始化设置
const http: NewAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string, /// /因为使用的是vite构建的项目，所以这里是这么获取代理名称的，根据自己情况修改
  // baseURL: 'http://192.168.2.25:8082',
  timeout: 3 * 1000 // 超过时间
});
// 请求拦截器
const QS_METHOD: Method[] = ['POST', 'post', 'PUT', 'put'];
const GET_METHOD: Method[] = ['GET', 'get', 'DELETE', 'delete'];
http.interceptors.request.use(
  response => {
    if (response.method && QS_METHOD.includes(response.method)) {
      // qs.stringify()将对象 序列化成URL的形式，以&进行拼接
      response.data = JSON.stringify(response.data);
    } else if (response.method && GET_METHOD.includes(response.method)) {
      response.params = qs.parse(response.params);
      response.data = qs.stringify(response.data);
    }
    return response;
  },
  error => {
    return error;
  }
);
// 响应拦截器
http.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 20000) {
      window.$message?.error(!res.message ? '系统异常' : res.message);
      return Promise.reject(response);
    }
    window.$message?.success(res.message);
    return Promise.resolve(response);
  },
  error => {
    window.$message?.error(error.response.data.message);
    return error;
  }
);
export default http;
