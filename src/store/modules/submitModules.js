import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import {getResultResData} from "../../utils/shared/request";
import { submitRequest } from "../../api/submit";
@Module({name: 'submit', namespaced: true, stateFactory: true})
export default class submitModules extends VuexModule {
    /**
     * @modules: 提交数据模块
     * @function：提交报名表
     */
    @Action
    async sybmitFun(data) {
        return getResultResData(await submitRequest.Login(data));
    }

}
