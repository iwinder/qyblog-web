import request from "@/utils/axios";

const loginApi = {
    Login: '/api/admin/v1/login',
    Logout: '/api/admin/v1/logout',
}

export interface LoginReqForm {
    username: string;
    password: string;
}

// 登录成功后返回的token
export interface LoginResData {
    token: string;
}

export function Login (parameter:LoginReqForm) {
    return request({
        url: loginApi.Login,
        method: 'post',
        data: parameter
    })
}