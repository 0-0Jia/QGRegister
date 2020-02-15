<style scoped lang="scss">
    .watchPrinter-container {
        width: 100%;
        overflow: scroll;
    }

    .watchPrinter-header {
        height: 50px;
        width: 100%;
        position: fixed;
        z-index: 50;
        background-color: white;
        top: 0;

        .watchPrinter-title {
            height: 100%;
            width: 70%;
            margin: auto;
            line-height: 50px;
            font-size: 1.5rem;
        }
    }

    .add-user-btn {
        position: fixed;
        right: 20px;
        top: 50%;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #1EFD0C;
        background-image: url("../../../../../assets/plus.png");
        background-repeat: no-repeat;
        background-size: 70%;
        background-position: center;
        z-index: 50;
    }

    .bottom-container {
        height: auto;
        width: 100%;
        margin-top: 50px;
    }

    .swift {
        height: 2rem;
        width: 100%;
        background-color: yellow;
    }

    .add-user {
        position: absolute;
        right: 0.6rem;
        top: 0;
        height: 100%;
        width: 10%;
        line-height: 50px;
        text-align: center;
        font-size: 3rem;
        background-color: white;
    }

    .con {
        position: relative;
        display: inline-block;
        margin: 1em auto;
        padding: 1.2em 1em;
        width: 90%;
        text-align: left;
        border-radius: 12px;
        background-color: #fff;
        background-image: url("../../../../../assets/editBg.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: auto 90%;
        box-shadow: 0 0 6px 0 #ccc;
        overflow: visible;

        .printer-name {
            font-weight: bold;
            height: 37px;
            line-height: 37px;
            font-size: 1.5em;
            color: black;
        }

        .arrow {
            position: absolute;
            height: 50px;
            width: 50px;
            font-size: 34px;
            right: 0;
            top: 50%;
            margin-top: -25px;
            line-height: 50px;
        }

        span {
            height: 40px;
            color: #666;
            font-size: 21px;
            font-weight: bold;
            line-height: 40px;
        }

        div {
            height: 28px;
            color: #888;
            font-size: 17px;
            line-height: 28px;
        }

        .delete-printer {
            display: block;
            position: absolute;
            height: 30px;
            width: 30px;
            top: -10px;
            right: -10px;
            z-index: 20;
            border-radius: 50%;
            background-color: #f77777;
            text-align: center;
            font-size: 2rem;
            color: white;
        }
    }

    .pattern {
        float: right;
        margin-right: 1em;
        height: 2em;
        color: #888;
        font-size: 1.3em;
        line-height: 1.8em;
    }

    .slide-fade-enter-active {
        transition: all 1s ease;
    }

    .slide-fade-enter
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateX(10px);
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity 1s;
    }

    .fade-enter /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    .is-empty {
        height: 32vh;
        line-height: 51vh;
        font-size: 20.3px;
        background-image: url("../../../../../assets/search.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 20%;
    }

</style>

<template>
    <transition name="slide-fade" appear>
        <div class="watchPrinter-container">
            <div class="is-empty" v-if="isEmpty">
                目前暂无打印机
            </div>

            <div v-if="!isEmpty">
                <div class="pattern">
                    <span v-if="pattern">ON</span>
                    <span v-else>OFF</span>
                    <i-switch v-model="pattern" true-color="#7292F9"/>
                </div>

                <div class="con" v-for="(Info) in printerList" @click="toEditPrinter(Info)">
                    <span></span>
                    <div class="printer-name">{{hasName(Info)}}</div>
                    <div>出厂名称：{{Info.defaultName}}</div>
                    <div>序列号：{{Info.serialNumber}}</div>
                    <div>交易类型：{{Info.payType}}</div>
                    <div>使用期限：{{Info.expire}}</div>
                    <transition name="fade">
                        <div class="delete-printer" @click="deletePrinterConfirm(Info.printerId)" v-if="pattern">×</div>
                    </transition>
                    <div class="arrow">&gt</div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import {getModule} from 'vuex-module-decorators';
    import store from '../../../../../store';
    import ClientModules from '../../../../../store/modules/ClientModules'
    import {isNotNullTrim} from "../../../../../utils/shared/isNotNullTrim";

    const clientModules = getModule(ClientModules, store);

    export default {
        data() {
            return {
                printerList: [],
                pattern: false,
                isEmpty: false
            }
        },
        mounted() {
            this.GetClientPrinterList()
        },
        methods: {
            /**
             * 获取客户打印机列表
             */
            GetClientPrinterList() {
                let userId = this.$route.query.userId
                clientModules.getClientPrinterList(userId).then((res) => {
                    if (res.code == 3001) {
                        localStorage.removeItem('AuthorizationAdmin')
                        this.$router.push({name: 'login'})
                        this.$Modal.error({
                            title: "错误",
                            content: res.message
                        });
                    }
                    if (res.code == -1) {
                        this.isEmpty = true
                        this.$Modal.error({
                            title: "错误",
                            content: res.message
                        });
                    } else {
                        if (res.data == null) {
                            this.isEmpty = true
                            throw new Error("后台返回数据为空")
                        }
                        if (res.data.length === 0 || res.data === null) {
                            this.isEmpty = true
                        }
                        this.printerList = []
                        this.printerList = res.data
                        //把2099的日期改为永久使用
                        for (let i = 0; i < this.printerList.length; i++) {
                            if (this.printerList[i].expire.split('-', 1) == '2099') {
                                this.printerList[i].expire = '永久使用'
                            }
                        }
                    }

                })
            },

            /**
             * 编辑打印机配置
             */
            toEditPrinter(Info) {
                this.$router.push({
                        name: 'editPrinter',
                        query: Info
                    }
                )
            },

            /**
             * 给客户添加打印机
             */
            toAddPrinter() {
                this.$router.push({
                        name: 'addClientPrinter',
                        query: {
                            userId: this.$route.query.userId,
                            name: this.$route.query.name
                        }
                    }
                )
            },

            /**
             * 删除打印机
             */
            deletePrinter(printerId) {
                clientModules.deleteClientPrinter(JSON.stringify({"printerId": printerId})).then((res) => {
                    if (res.code == 3001) {
                        localStorage.removeItem('AuthorizationAdmin')
                        this.$router.push({name: 'login'})
                        this.$Message.error(res.message);
                    }
                    if (res.code == -1) {
                        this.$Message.error(res.message);
                    } else {
                        if (res.data == null) {
                            throw new Error("后台返回数据为空")
                        }
                        if (res.data == true) {
                            this.$Message.success('删除成功');
                            this.GetClientPrinterList()
                        } else {
                            this.$Message.error('未知错误');
                        }
                    }
                })
            },

            /**
             * 删除打印机操作确认
             */
            deletePrinterConfirm(printerId) {
                event.cancelBubble = true
                this.$Modal.confirm({
                    title: '操作确认',
                    content: '<p>你确认要删除打印机吗</p>',
                    onOk: () => {
                        this.deletePrinter(printerId)
                    },
                });
            },

            /**
             * 判断名字是否为空，如果为空就显示出厂名称，如果不为空就显示用户起的名字
             */
            hasName(info) {
                if (info.adminName == null || !isNotNullTrim(info.adminName)) {
                    return info.defaultName
                } else {
                    return info.adminName
                }
            }
        }
    }

</script>
