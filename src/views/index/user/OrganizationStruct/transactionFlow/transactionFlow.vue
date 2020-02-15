<style scoped lang="scss">
    .transaction-flow {
        width: 100%;
    }
    .watchPrinter-header {
        top: 0;
        height: 50px;
        width: 100%;
        position: fixed;
        background-color: white;
        z-index: 20;

        div {
            height: 100%;
            width: 70%;
            margin: auto;
            line-height: 50px;
            font-size: 1.5rem;
        }
    }

    .bottom-container{
        margin-top: 50px;
        width: 100%;
    }

    .record-card {
        position: relative;
        height: 10vh;
        width: 90%;
        margin: auto;
        border-bottom: 1px solid #e8dede;
    }

    .rent-container {
        height: 100%;
        position: absolute;
        left: 0;
        width: 20%;
        background-image: url("../../../../../assets/租用.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 61%;
    }

    .buy-container {
        height: 100%;
        position: absolute;
        left: 0;
        width: 20%;
        background-image: url("../../../../../assets/买.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 61%;
    }

    .middle-container {
        text-align: left;
        line-height: 5vh;
        height: 50%;
        position: absolute;
        top: 0.5vh;
        right: 0;
        width: 80%;
        font-size: 2.8vh;
    }

    .time-container {
        text-align: left;
        line-height: 5vh;
        height: 50%;
        width: 80%;
        position: absolute;
        top: 4.5vh;
        right: 0;
        font-size: 2.8vh;
    }

    /*.circle {*/
    /*    right: 0;*/
    /*    position: absolute;*/
    /*    width: 60px;*/
    /*    height: 20px;*/
    /*    background: #1ec8b5;*/
    /*    border-radius: 5px;*/
    /*    line-height: 20px;*/
    /*    color: white;*/
    /*    font-size: 0.7rem;*/
    /*}*/

</style>

<template>
    <div class="transaction-flow">
        <div class="watchPrinter-header">
            <div class="watchPrinter-title">
                交易流水
            </div>
        </div>

        <div class="bottom-container">
            <div class="record-card" v-for="(list, item) in transactionList" :key="item">
                <div :class="DifferentPhoto(list)"></div>
                <div class="middle-container">{{list.type}}{{list.printerName}}{{isRent(list)}}</div>
                <div class="time-container">{{list.deadline}}</div>
<!--                <div class="circle">交易成功</div>-->
            </div>
        </div>
    </div>
</template>


<script>
    import ClientModules from '../../../../../store/modules/ClientModules'
    import {getModule} from 'vuex-module-decorators';
    import store from '../../../../../store';

    const clientModules = getModule(ClientModules, store);

    export default {
        data() {
            return {
                transactionList: []
            }
        },

        mounted() {
            this.getTransactionList()
        },

        methods: {
            //todo 万一名字太长了怎么办
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
                        this.$Message.error(res.message);
                    } else {
                        this.transactionList = res.data
                    }
                })
            },
            /**
             * 根据不同的类型显示不同的图片
             */
            DifferentPhoto(type) {
                if(type.type === '租用') {
                    return "rent-container"
                } else {
                    return "buy-container"
                }
            },

            /**
             * 根据不同的类型决定html上显示不同的东西
             */
            isRent(type) {
                if(type.type === '租用') {
                    return type.day + "天"
                } else {
                    return ''
                }
            }

        }
    }
</script>