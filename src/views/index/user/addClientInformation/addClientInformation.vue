<style scoped lang="scss">
    .addClientInformation-container {
        top: 0;
        position: absolute;
        height: 100vh;
        width: 100%;
        background-color: white;
        z-index: 100;
    }

    .addClientInformation-module-title {
        position: fixed;
        height: 50px;
        width: 100%;
        background-color: white;
        z-index: 40;
    }

    .addClientInformation-module-container {
        height: 100%;
        width: 70%;
        margin: auto;
        line-height: 50px;
        font-size: 1.3rem;
        vertical-align: top;
    }

    .save-btn {
        position: absolute;
        top: 7.5px;
        right: 16px;
        height: 70%;
        width: 20%;
        color: white;
        line-height: 35px;
        font-size: 1.1rem;
        vertical-align: top;
        background: rgba(0, 197, 170, 1);
        border-radius: 6px;
    }

    .bottom-container {
        width: 100%;
        overflow: scroll;
        margin: 50px auto;
    }

    .form-data-container {
        height: 2rem;
        width: 95%;
        margin: 1rem auto;
        text-align: left;

        .input-title {
            display: inline-block;
            height: 100%;
            width: 25%;
            line-height: 2rem;
        }

        .input-container {
            display: inline-block;
            height: 100%;
            width: 75%;
            line-height: 2rem;
            vertical-align: top;
        }

        .transaction-checkbox-container {
            display: inline-block;
            height: 100%;
            width: 75%;
            text-indent: 10px;
            line-height: 2rem;
            vertical-align: top;
            text-align: left;
        }

        input {
            border: 1px solid #e0dcdc;
            -webkit-appearance: none;
            outline: none;
        }
    }

    .authority-container {
        height: 15rem;
        width: 88%;
        margin: 1rem auto;
        background-color: white;
    }

    .authority-title {
        height: 2rem;
        width: 88%;
        background-color: white;
        text-align: left;
    }

    .authority-select {
        width: 100%;
        margin: 0 auto;
        background-color: white;
    }

    .checkbox-container {
        height: 2.5rem;
        width: 88%;
        margin: 0 auto 0 12%;
        background-color: white;
        text-align: left;
        line-height: 2.5rem;
    }

    .client-container {
        height: 10rem;
        width: 100%;
        background-color: white;
        margin-top: 1vh;
    }

    .client-title {
        height: 2rem;
        width: 88%;
        margin: 0 auto;
        background-color: white;
        text-align: left;
    }

    .client-select {
        height: 2.5rem;
        width: 88%;
        background-color: white;
    }

    .status-title {
        float: left;
        height: 88%;
        width: 12%;
        background-color: white;
        line-height: 2.5rem;
        text-align: left;
    }

    .status-checkbox-container {
        float: left;
        height: 88%;
        width: 70%;
        background-color: white;
        line-height: 2.5rem;
        text-align: left;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-enter
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateX(10px);
        opacity: 0;
    }

</style>

<template>
    <transition name="slide-fade" appear>
        <div class="addClientInformation-container">
            <div class="addClientInformation-module-title">
                <div class="addClientInformation-module-container">增加新商户</div>
                <div class="save-btn" @click="Inquiry">保存</div>
            </div>
            <div class="bottom-container">
                <div class="form-data-container">
                    <div class="input-title"><span style="color: red">* </span>商家名称:</div>
                    <div class="input-container">
                        <input v-model="basicInformation.merchantName" placeholder="请输入商家名称" style="width: 100%;"/>
                    </div>
                </div>

                <div class="form-data-container">
                    <div class="input-title"><span style="color: red">* </span>商家简称:</div>
                    <div class="input-container">
                        <input v-model="basicInformation.merchantSimple" placeholder="商家的代号或品牌名称" style="width: 100%"/>
                    </div>
                </div>

                <div class="form-data-container">
                    <div class="input-title"><span style="color: red">* </span>联系人:</div>
                    <div class="input-container">
                        <input v-model="basicInformation.name" placeholder="请输入联系人" style="width: 100%"/>
                    </div>
                </div>

                <div class="form-data-container">
                    <div class="input-title"><span style="color: red">* </span>手机/账号:</div>
                    <div class="input-container">
                        <input v-model="basicInformation.username" placeholder="请输入手机,输入不能带空格" style="width: 100%"/>
                    </div>
                </div>

                <div class="form-data-container">
                    <div class="input-title"><span style="color: red">* </span>密码</div>
                    <div class="input-container">
                        <input v-model="basicInformation.password" placeholder="密码至少包含字母和数组组合" style="width: 100%"/>
                    </div>
                </div>

                <div class="form-data-container">
                    <div class="input-title"><span style="color: red">* </span>交易类型:</div>
                    <div class="transaction-checkbox-container">
                        <CheckboxGroup v-model="transactionType" @on-change="selectType">
                            <Checkbox label="买断"></Checkbox>
                            <Checkbox label="租用"></Checkbox>
                        </CheckboxGroup>
                    </div>
                </div>

                <div class="authority-container">
                    <div class="authority-title"><span style="color: red">* </span>微信端功能权限</div>
                    <div class="authority-select">
                        <CheckboxGroup v-model="authority" @on-change="authorityChange">
                            <div class="checkbox-container">
                                <Checkbox label="monitor">打印机监控</Checkbox>
                            </div>
                            <div class="checkbox-container">
                                <Checkbox label="control">打印机远程控制</Checkbox>
                            </div>
                            <div class="checkbox-container">
                                <Checkbox label="trade">交易列表</Checkbox>
                            </div>
                            <div class="checkbox-container">
                                <Checkbox label="statistic">数据统计</Checkbox>
                            </div>
                            <div class="checkbox-container">
                                <Checkbox label="manager">子账户管理</Checkbox>
                            </div>
                        </CheckboxGroup>
                    </div>
                </div>

                <div class="client-container">
                    <div class="client-title"><span style="color: red">* </span>客户端控制权限</div>
                    <RadioGroup v-model="customerControl" vertical class="client-select">
                        <Radio label="1" class="checkbox-container" style="height: 100%; line-height: 2.5rem">
                            <span>OPR</span>
                        </Radio>
                        <Radio label="2" class="checkbox-container" style="height: 100%; line-height: 2.5rem">
                            <span>SUPER</span>
                        </Radio>
                        <Radio label="3" class="checkbox-container" style="height: 100%; line-height: 2.5rem">
                            <span>TPM3D</span>
                        </Radio>
                    </RadioGroup>
                </div>

                <div class="form-data-container">
                    <div class="input-title"><span style="color: red">* </span>状态:</div>
                    <div class="transaction-checkbox-container">
                        <RadioGroup v-model="Status">
                            <Radio label="启用"></Radio>
                            <Radio label="禁用"></Radio>
                        </RadioGroup>
                    </div>
                </div>

            </div>
        </div>
    </transition>
</template>

<script>
    import {getModule} from 'vuex-module-decorators';
    import store from '../../../../store';
    import ClientModules from '../../../../store/modules/ClientModules'
    import {isNotNullTrim} from "../../../../utils/shared/isNotNullTrim";
    import {PassWordFormat} from "../../../../utils/shared/PassWordFormat";
    import {PhoneFormat} from "../../../../utils/shared/phoneFormat";

    const clientModules = getModule(ClientModules, store);

    export default {
        data() {
            return {
                Status: null,
                basicInformation: {
                    name: null,
                    merchantSimple: null,
                    merchantName: null,
                    username: null,
                    password: null
                },
                transactionType: [],
                authority: [],
                customerControl: null
            }
        },

        methods: {
            /**
             * 交易类型买断和租用切换
             */
            selectType(Array) {
                if (Array.length === 2) {
                    Array.shift()
                }
            },

            /**
             * 检查多选权限框的变化
             */
            authorityChange(data) {
            },


            /**
             * 增加账户前的的输入检测
             */
            CheckRequestData() {
                for (let i in this.basicInformation) {
                    if (this.basicInformation[i] == null || !isNotNullTrim(this.basicInformation[i])) {
                        this.$Message.error("输入不能为空");
                        return
                    }
                }
                if(this.basicInformation.merchantName.length >= 10) {
                    this.$Message.error("商家名称不能大于等于10个字");
                    return;
                }

                if(this.basicInformation.name.length > 10) {
                    this.$Message.error("联系人名称不能大于等于10个字");
                    return;
                }

                if(PhoneFormat(this.basicInformation.username)) {
                    this.$Message.error("手机输入有误");
                    return
                }
                if (PassWordFormat(this.basicInformation.password)) {
                    this.$Message.error("密码由6-8位英文加数字组合");
                    return;
                }
                if(this.transactionType.length === 0) {
                    this.$Message.error("请选择商户类型");
                    return
                }
                if(this.Status == null || !isNotNullTrim(this.Status)) {
                    this.$Message.error("请选择状态");
                    return
                }

                if(this.authority.length === 0 ) {
                    this.$Message.error("请选择微信权限");
                    return
                }
                if (this.customerControl == null) {
                    this.$Message.error("请选择客户端权限");
                    return
                } else {
                    if (this.customerControl === 'OPR') {
                        this.customerControl = 1
                    } else if (this.customerControl === 'SUPER') {
                        this.customerControl = 2
                    } else if (this.customerControl === 'TPM') {
                        this.customerControl = 3
                    }
                }

                //假如用户输入的账户是租用的，则禁止用户选择账户管理模块
                if(this.transactionType[0] === '租用' && this.authority.indexOf('manager') !== -1) {
                    this.$Message.error("租用用户无法选择子账户管理权限");
                    return
                }
                this.sendAddRequest()
            },

            /**
             * 询问客户是否确定要添加打印机
             */
            Inquiry() {
                this.$Modal.confirm({
                    title: '操作确认',
                    content: '<p>你确认要保存吗?</p>',
                    onOk: () => {
                        this.CheckRequestData();
                    },
                });
            },

            /**
             * 将信息提交到后台
             */
            sendAddRequest() {
                let requestData = {
                    "merchantName": this.basicInformation.merchantName,
                    "merchantSimple": this.basicInformation.merchantSimple,
                    "name": this.basicInformation.name,
                    "superior": null,	// 该字段可以为空
                    "username": this.basicInformation.username,
                    "password": this.basicInformation.password,
                    "status": 0,	// 状态值
                    "monitor": 0,	// 监控权限
                    "control": 0,	// 控制权限
                    "manager": 0,	// 用户管理权限
                    "trade": 0,	// 交易权限
                    "statistic": 0,	// 统计权限
                    "menu": this.customerControl,	// 客户端权限
                    "payType": false	// true为买断类型，false为租用类型
                }

                if (this.transactionType[0] === '买断') {
                    requestData.payType = true
                }

                if(this.Status === '启用') {
                    requestData.status = 1
                } else {
                    requestData.status = 0
                }

                for (let i = 0; i < this.authority.length; i++) {
                    requestData[this.authority[i]] = 1
                }

                clientModules.addClient(JSON.stringify(requestData)).then((res) => {
                    if (res.code == 3001) {
                        localStorage.removeItem('AuthorizationAdmin')
                        this.$router.push({name: 'login'})
                        this.$Message.error(res.message);
                    }
                    if (res.code == -1) {
                        this.$Message.error(res.message);
                    } else {
                        this.$Message.success("添加成功");
                        this.$router.push({name: "user"})
                    }

                })
            }


        }
    }
</script>