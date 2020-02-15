import axios from 'axios';

let baseUrl = ' http://www.cxkball.club/api/admin/';// 不知道能不能写服务器真实地址

let AuthorizationAdmin = null

// @ts-ignore
const _Request = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * 统一对请求进行处理
 */
_Request.interceptors.request.use((config) => {
    // 当存在token的时候，将token加到请求头上面
    if (localStorage.getItem("AuthorizationAdmin")) {
        config.headers['Authorization'] = JSON.parse(localStorage.getItem("AuthorizationAdmin")).value;
    }
    return config
}, error => {
    //403
    //500 做出相应的错误提示
})

/**
 * 统一对返回的数据进行过滤
 */
_Request.interceptors.response.use((result) => {
    // 当没有前面的问题的时候，返回请求对象的数据
    //拿取头部证书
    if(!localStorage.getItem("AuthorizationAdmin")) {
        localStorage.setItem("AuthorizationAdmin", JSON.stringify({
            value: result.headers.authorization,
            expires: new Date().getTime() + 2400 * 1000
        }))
    }
    return result.data;
}, (error) => {
  //  console.log(error)
    // 请求发生错误的时候
    let status = error.response.status;


    return error;
});

export class Request {
    //这个东西不知道有什么用
    commonUrl = '';

    get(url) {
        return _Request.get(this.commonUrl + url);
    }

    post(url, data) {
        return _Request.post(this.commonUrl + url, data);
    }

    upload(url, data) {
        return _Request.post(this.commonUrl + url, data, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
    }

    put(url, data) {
        return _Request.put(this.commonUrl + url, data);
    }

    delete(url, data) {
        return _Request.delete(this.commonUrl + url);
    }
}
