<style scoped lang="scss">
    .printer-info-container {
        height: 100vh;
    }

    .top-container {
        height: 50px;
        width: 100%;
        position: fixed;
        top: 0;
        background-color: white;
        z-index: 20;
        text-align: center;

        .modules-title {
            height: 100%;
            display: inline-block;
            line-height: 50px;
            font-size: 1.3rem;
        }

        .add-printer {
            height: 100%;
            position: absolute;
            line-height: 50px;
            font-size: 2.5rem;
            right: 1rem;
            top: 0;
        }
    }

    .bottom-container {
        padding-top: 50px;
    }

    .title-tag {
        height: 2.2rem;
        font-size: 0;
    }

    .printer-list-entrance {
        display: inline-block;
        height: 100%;
        width: 40%;
        line-height: 2.2rem;
        font-size: 1rem;
        text-align: center;
    }
</style>

<template>
        <div class="printer-info-container">
            <div class="top-container">
                <div class="modules-title">打印机信息</div>
                <div class="add-printer" @click="toAddPrinter" v-if="watchPrinter">+</div>
            </div>

            <div class="bottom-container">
                <div class="title-tag">
                    <div class="printer-list-entrance"
                         style="margin-right: 10px;border-bottom: 2px solid #00c5aa;color: #00c5aa" ref="list"
                         @click="clickList">打印机列表
                    </div>
                    <div class="printer-list-entrance" style="margin-left: 10px" ref="transaction"
                         @click="transactionList">交易流水
                    </div>
                </div>

                <div class="content">
                    <watchPrinter v-if="watchPrinter"></watchPrinter>
                    <transactionFlow v-if="transactionFlow"></transactionFlow>
                </div>
            </div>
        </div>
</template>
<script>
    import {getModule} from "vuex-module-decorators";
    import store from "../../../../store";
    import ClientModules from "../../../../store/modules/ClientModules";
    import watchPrinter from './watchPrinter/watchPrinter.vue'
    import transactionFlow from './transactionFlow/transactionFlow.vue'

    const clientModules = getModule(ClientModules, store);

    export default {
        components: {watchPrinter, transactionFlow},
        data() {
            return {
                watchPrinter: true,
                transactionFlow: false
            };
        },

        mounted() {
        },

        watch: {},

        methods: {
            /**
             * 点击上面的tag切换不同的样式表示选中
             */
            clickList() {
                this.$refs.list.style.color = "#00c5aa"
                this.$refs.list.style.borderBottom = "2px solid #00c5aa"
                this.$refs.transaction.style.color = "black"
                this.$refs.transaction.style.borderBottom = "none";
                this.watchPrinter = true
                this.transactionFlow = false
            },

            transactionList() {
                this.$refs.transaction.style.color = "#00c5aa"
                this.$refs.transaction.style.borderBottom = "2px solid #00c5aa"
                this.$refs.list.style.color = "black"
                this.$refs.list.style.borderBottom = "none";
                this.watchPrinter = false
                this.transactionFlow = true
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
        }
    }
</script>