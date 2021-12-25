import { AxiosRequestConfig } from 'axios';
import http from './http';
import { ApiKeyDataType, ApiKeyType, ApiList } from './api';
/*
限制泛型T必须是接口列表（apiKeyType）中的key
限制obj中的url必须是接口列表中key的某一格
*/
export default <T extends ApiKeyType>(obj: AxiosRequestConfig & { url: T }) => {
  /*
    限制最终的返回数据类型
    */
  const MyUrl = ApiList[obj.url];
  return new Promise<ApiKeyDataType[T]>((resolve, reject) => {
    /*
        传递泛型给http中的拦截器
        */
    http<ApiKeyDataType[T]>({
      url: MyUrl,
      data: obj.data || {},
      headers: obj.headers,
      params: obj.params,
      method: obj.method || 'GET',
      responseType: obj.responseType || 'json'
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
