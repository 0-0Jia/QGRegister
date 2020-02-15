record-card<style scoped lang="scss">
    .transaction-flow {
        width: 100%;
    }

    .record-card {
        position: relative;
        height: 112px;
        width: 90%;
        margin: auto;
        border-bottom: 1px solid #e8dede;
    }

    .device-name {
        float: left;
        height: 28px;
        line-height: 28px;
        font-size: 17px;
        font-weight: bold;
    }

    .rent-container {
        float: left;
        height: 100%;
        left: 0;
        width: 20%;
        background-image: url("../../../../../assets/租用.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 61%;
    }

    .buy-container {
        float: left;
        height: 100%;
        left: 0;
        width: 20%;
        background-image: url("../../../../../assets/买.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 61%;
    }

    .middle-container {
        float: left;
        text-align: left;
        font-size: 17px;
        line-height: 28px;
        width: 80%;
        overflow-y: hidden;
        overflow-x: scroll;
        scroll-behavior: smooth;
        word-break: keep-all;
    }

    .time-container {
        float: left;
        line-height: 28px;
        width: 80%;
        text-align: left;
        font-size: 17px;
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
</style>

<template>
    <transition name="slide-fade" appear>
        <div class="transaction-flow">
            <div class="is-empty" v-if="isEmpty">
                目前暂无交易记录
            </div>

            <div class="record-card" v-for="(list, item) in transactionList" :key="item" v-if="!isEmpty">
                <div :class="DifferentPhoto(list)"></div>
                <div class="device-name">{{hasName(list)}}</div>
                <div class="time-container">类型： {{whichType(list)}}</div>
                <div class="time-container">交易时间： {{list.time.split(' ', 1)[0]}}</div>
                <div class="time-container">使用期限：{{judgeDeadline(list)}}</div>
            </div>
        </div>
    </transition>
</template>


<script>
    import ClientModules from '../../../../../store/modules/ClientModules'
    import {getModule} from 'vuex-module-decorators';
    import store from '../../../../../store';

    const clientModules = getModule(ClientModules, store);
    export default {
        data() {
            return {
                transactionList: [],
                isEmpty: false,
            }
        },
        mounted() {
            this.getTransactionList()
        },
        methods: {
            /**
             * 获取用户交易流水
             */
            getTransactionList() {
                clientModules.TransactionFlow(this.$route.query.userId).then((res) => {
                    if (res.code == 3001) {
                        localStorage.removeItem('AuthorizationAdmin')
                        this.$router.push({name: 'login'})
                        this.$Message.error(res.message);
                    } else if (res.code == -1) {
                        this.isEmpty = true
                    } else {
                        if (res.data.length === 0 || res.data === null) {
                            this.isEmpty = true
                        } else {
                            this.transactionList = res.data
                            //把2099的日期改为永久使用
                            for (let i = 0; i < this.transactionList.length; i++) {
                                if (this.transactionList[i].deadline.split('-', 1) == '2099') {
                                    this.transactionList[i].deadline = '永久使用'
                                } else {
                                    this.transactionList[i].deadline = this.transactionList[i].deadline.split(' ', 1)[0]
                                }
                            }
                        }
                    }
                })
            },
            /**
             * 根据不同的类型显示不同的图片
             */
            DifferentPhoto(type) {
                if (type.type === '租用') {
                    return "rent-container"
                } else {
                    return "buy-container"
                }
            },
            /**
             * 类型切换
             */
            whichType(list) {
                if(list.type === '永久使用') {
                    return '买断'
                }
                return list.type
            },

            /**
             * 对名字的处理
             */
            hasName(list) {
                if(list.adminName == null || list.adminName == '') {
                    return list.defaultName
                }
                return list.adminName
            },

            /**
             * 使用期限显示
             */
            judgeDeadline(list) {
                if(list.type === '永久使用') {
                    return '永久使用'
                } else {
                    return list.deadline
                }

            }
        }
    }
</script>
