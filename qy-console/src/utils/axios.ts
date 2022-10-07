import axios, {AxiosError} from 'axios'
import {notification} from "ant-design-vue";
import {Session} from "@/utils/cache/index"
import {ACCESS_TOKEN} from "@/utils/constants";
import {useUserInfo} from "@/store/userInfo";
const userStore =useUserInfo();
// 创建 axios 实例
const request = axios.create({
    // API 请求的默认前缀
    baseURL: import.meta.env.VITE_APP_BASE_API,
    withCredentials: true,
    timeout: 6000, // 请求超时时间

});

// 异常拦截处理器
const errorHandler = (error: AxiosError) => {
    if (error.response) {
        const data = error.response.data
        // 从 localstorage 获取 token
        const token = userStore.token;
        if (error.response.status === 403) {
            notification.error({
                message: 'Forbidden',
                description: data.message
            });
        }else  if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
            notification.error({
                message: 'Unauthorized',
                description: 'Authorization verification failed'
            });
            if (token) {
                userStore.token = "";
            }
        } else {
            notification.error({
                message: '请求异常',
                description: data.message
            });
        }
        return Promise.reject(data);
    } else {
        return Promise.reject(error);
    }

}

// request interceptor
request.interceptors.request.use(config => {
    const token = userStore.token;
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token) {
        config.headers[ACCESS_TOKEN] = token;
    }
    return config;
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
    if(response.data.pageInfo) {
        response.data.pageInfo.current = parseInt(response.data.pageInfo.current);
        response.data.pageInfo.pageSize = parseInt(response.data.pageInfo.pageSize);
        response.data.pageInfo.total = parseInt(response.data.pageInfo.total);
        response.data.pageInfo.pages = parseInt(response.data.pageInfo.pages);
    }
    return response.data
}, errorHandler)

export default request