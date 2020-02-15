import {Request} from "../api/config";


class submit extends Request {
    //登陆请求
    submit(data) {
        return this.post('/', data);
    }
}

export const submitRequest = new submit();