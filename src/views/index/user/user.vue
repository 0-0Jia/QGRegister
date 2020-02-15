<style scoped lang="scss">
    .user {
        height: 100vh;
        width: 100%;
        position: relative;
    }

    .input-header {
        height: 50px;
        width: 100%;
        position: fixed;
        background-color: white;
    }

    .input-container {
        height: 100%;
        width: 100%;
        font-size: 0;

        .modules-title {
            display: inline-block;
            height: 100%;
            margin: auto;
            line-height: 50px;
            font-size: 1.3rem;
        }

        /*input {*/
        /*    margin-top: 10px;*/
        /*    height: 60%;*/
        /*    width: 100%;*/
        /*    border: 1px solid #707070;*/
        /*    border-radius: 6px;*/
        /*    outline: none;*/
        /*}*/
        /*div {*/
        /*    top: 10px;*/
        /*    position: absolute;*/
        /*    right: 0;*/
        /*    height: 60%;*/
        /*    width: 30px;*/
        /*    border-radius: 6px;*/
        /*    background-color: #00C5AA;*/
        /*    background-image: url("../../../assets/搜索.png");*/
        /*    background-repeat: no-repeat;*/
        /*    background-position: center;*/
        /*    background-size: 50%;*/
        /*}*/
    }

    .add-user {
        position: fixed;
        height: 50px;
        top: 0;
        right: 0.6rem;
        width: 10%;
        line-height: 50px;
        text-align: center;
        font-size: 3rem;
        background-color: white;
    }

    .division-line {
        height: 1vh;
        width: 100%;
        background-color: #F5F5F5;
    }

    .user-information-container {
        width: 100%;
        padding-top: 58px;
    }

    .search {
        height: 2.5rem;
        width: 90%;
        margin: auto;
        font-size: 0;
        color: #c1bebe;

        .input-frame {
            height: 2rem;
            background-color: #ebebeb;
            margin-top: 1rem;
            border-radius: 6px;
            text-align: left;
            line-height: 2rem;
            font-size: 1rem;
        }

        .search-image {
            display: inline-block;
            height: 100%;
            width: 30px;
            background-image: url("../../../assets/搜索.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 70%;
        }
    }

    .user-information-card {
        width: 85%;
        margin-bottom: 1.8rem;
        margin-left: 7.5%;
        border-radius: 9px;
        border: 1px solid rgba(216, 216, 216, 1);
        box-shadow: 0 0 6px 0 #ccc;
        padding-left: 1rem;
    }

    .user-name {
        height: 6vh;
        width: 100%;
        text-align: left;
        line-height: 6.6vh;
        font-size: 18px;
        margin-top: 1vh;
    }

    .user-phone, .user-status {
        height: 4vh;
        line-height: 4vh;
        text-align: left;
        font-size: 15px;
        overflow: hidden;
    }

    .user-type {
        display: inline-block;
        height: 3vh;
        width: 88px;
        background-color: white;
        line-height: 3vh;

        border-radius: 30px 30px 30px 30px;
        vertical-align: center;
        margin-top: 1.5vh;
        margin-right: 1rem;
        float: right;
        text-align: center;
        border: 1px solid black;
        @media screen and (max-width: 320px){
            font-size: 12px;
        }

        @media screen and (min-width: 321px){
            font-size: 15px;
        }
    }

    .btn-container {
        height: 4vh;
        width: 100%;
        margin-bottom: 1vh;
    }

    .wechat-untie {
        float: right;
        height: 100%;
        width: 25%;
        border: 1px solid rgba(215, 222, 228, 1);
        background-color: white;
        border-radius: 4px 0 0 4px;
        outline: none;
        line-height: 4vh;
    }

    .wechat-edit {
        float: right;
        height: 100%;
        width: 25%;
        background: #00c5aa;
        border: 1px solid rgba(215, 222, 228, 1);
        line-height: 4vh;
        margin-right: 1rem;
        border-radius: 0 4px 4px 0;
        color: white;
    }

    .add-user-btn {
        position: fixed;
        right: 20px;
        top: 50%;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #1EFD0C;
        background-image: url("../../../assets/plus.png");
        background-repeat: no-repeat;
        background-size: 70%;
        background-position: center;
    }

    .slide-fade-enter-active {
        transition: all .4s ease;
    }

    .slide-fade-enter
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateX(10px);
        opacity: 0;
    }

    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .demo-spin-col {
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }

    .page {
        position: fixed;
        bottom: 0;
        width: 100vw;
        height: 3rem;
        line-height: 3rem;
        background-color: white;
        border-top: 1px solid #eeeeee;
    }
</style>

<template>
    <transition name="slide-fade" appear>
    <div class="user" style="position: relative">
        <!--分页-->
        <div class="page">
            <Page :current="PageIndex"
                  simple
                  :page-size="4"
                  :total="FatherAccountList.length"
                  style="width: 100%"
                  @on-change="Page"
            />
        </div>

        <Spin fix v-if="spinShow" style="color: #00C5AA">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>加载中</div>
        </Spin>
        <div class="input-header">
            <div class="input-container">
                <div class="modules-title">商户管理</div>
                <div @click="toAddClientInformation" class="add-user">+</div>
            </div>
        </div>

        <div class="user-information-container">
            <div class="user-information-card" v-for="(clientList, item) in tempList" v-bind:key="item">
                <div class="user-name">
                    <div style="display:inline-block;width: 59%;overflow-x: hidden;font-weight: bold;height: 100%">
                        {{clientList.merchantName}}
                    </div>
                    <div class="user-type" :style="differentColor(clientList.payType)">
                        {{clientList.payType}}商户
                    </div>
                </div>
                <div class="user-phone">联系人: {{clientList.name}}</div>
                <div class="user-phone">手机: {{clientList.username}}</div>
                <div class="user-status">权限: {{showRight(clientList)}}</div>
                <div class="user-status">状态: {{clientList.statusName}}</div>

                <div class="btn-container">
                    <div class="wechat-edit" @click="toOrganization(clientList.userId)">组织架构</div>
                    <input type="button" class="wechat-untie" value="设备管理"
                           @click="ConfirmUntie(clientList.userId)">
                </div>
            </div>

            <div style="height: 3rem"></div>
        </div>
    </div>
    </transition>
</template>


<script>
    import ClientModules from '../../../store/modules/ClientModules'
    import {getModule} from 'vuex-module-decorators';
    import store from '../../../store';

    const clientModules = getModule(ClientModules, store);
    export default {
        data() {
            return {
                show: true,
                addClientInformation: false,
                FatherAccountList: [],
                tempList: [],
                spinShow: true,
                PageIndex: 1,
            }
        },
        mounted() {
            document.title = '商户管理'
            this.getClientList()
        },
        computed: {},
        methods: {
            /**
             * 分页处理
             */
            Page(pageNumber) {
                this.tempList.length = 0
                if (this.FatherAccountList.length === 0) {
                    return false
                }
                this.PageIndex = pageNumber
                for (let i = 4 * (this.PageIndex - 1); i < 4 * this.PageIndex && i < this.FatherAccountList.length; i++) {
                    this.tempList.push(this.FatherAccountList[i])
                }
            },

            /**
             * 跳转组织架构页面
             */
            toOrganization(id) {
                let index = null
                for (let i = 0; i < this.FatherAccountList.length; i++) {
                    if (this.FatherAccountList[i].userId === id) {
                        index = i
                        break
                    }
                }

                this.$router.push({
                        name: 'OrganizationStruct',
                        query: this.FatherAccountList[index]
                    }
                )
            },

            /**
             * 获取父账户用户列表
             */
            getClientList() {
                clientModules.getUserList().then((res) => {
                    if (res.code == 3001) {
                        localStorage.removeItem('Authorization')
                        this.$router.push({name: 'login'})
                        this.$Message.error(res.message);
                    }
                    if (res.code == -1) {
                        this.$Message.error(res.message);
                    } else {
                        if (res.data == null) {
                            this.$Message.error('暂无商户信息user-information-card');
                        }
                        for (let i = 0; i < res.data.length; i++) {
                            if (res.data[i].payType == true) {
                                res.data[i].payType = '买断'
                            } else {
                                res.data[i].payType = '租用'
                            }
                        }
                        this.FatherAccountList = res.data
                        this.Page(1)
                    }
                    this.spinShow = false
                })
            },

            /**
             * 跳转设备管理
             */
            ConfirmUntie(id) {
                let index = null
                for (let i = 0; i < this.FatherAccountList.length; i++) {
                    if (this.FatherAccountList[i].userId === id) {
                        index = i
                        break
                    }
                }
                this.$router.push({
                    name: "PrinterInfo",
                    query: this.FatherAccountList[index]
                })
            },

            /**
             *  跳转至添加子账户页面
             */
            toAddClientInformation() {
                this.$router.push({
                    name: "addClientInformation"
                })
            },

            /**
             * 类型显示根据不同用户类型显示不同的样式
             */
            differentColor(type) {
                if (type === "买断") {
                    return "color: #99bee8;border: 1px solid #99bee8;"
                } else {
                    return "color: #f1da5e;border: 1px solid #f1da5e;"
                }
            },

            /**
             * 权限展示
             */
            showRight(client) {
                //记录只显示两个权限
                let index = 0;
                let rightStr = ''
                if (client.monitor === true) {
                    index++
                    rightStr += '打印机监控 '
                    if (index === 2) {
                        return rightStr += '...'
                    }
                }
                if (client.control === true) {
                    index++
                    rightStr += '打印机控制 '
                    if (index === 2) {
                        return rightStr += '...'
                    }
                }
                if (client.manager === true) {
                    index++
                    rightStr += '用户管理 '
                    if (index === 2) {
                        return rightStr += '...'
                    }
                }
                if (client.statistic === true) {
                    index++
                    rightStr += '数据统计 '
                    if (index === 2) {
                        return rightStr += '...'
                    }
                }
                if (client.trade === true) {
                    index++
                    rightStr += '交易流水'
                    if (index === 2) {
                        return rightStr += '...'
                    }
                }
                return rightStr
            },
        }
    }
</script>
