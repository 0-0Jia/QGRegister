<style scoped lang="scss">
    .control-page {
        width: 100%;
    }

    .bottom-container {
        width: 100%;
        padding-top: 50px;
    }


    .printer-num-contaniner {
        position: fixed;
        height: 50px;
        width: 100%;
        margin: auto;
        text-align: center;
        z-index: 99;
        background-color: white;
    }

    .printer-num {
        position: absolute;
        left: 50%;
        height: 50px;
        width: 200px;
        margin-left: -100px;
        text-align: center;
        line-height: 50px;
        background-color: white;
        font-size: 20.8px;
    }

    .remote-control-comtainer {
        height: 15rem;
        width: 95%;
        margin: auto;
        box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.16);
        opacity: 0.8;
        border-radius: 12px;
        margin-top: 0.1rem;
    }

    .operating-history {
        height: 24rem;
        width: 95%;
        margin: auto;
        box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.16);
        opacity: 0.8;
        border-radius: 12px;
        margin-bottom: 1.5rem;
        overflow: auto;
    }

    .remote-control-title {
        height: 3rem;
        width: 90%;
        margin: auto;
        text-align: left;
        line-height: 3rem;
        color: rgba(102, 102, 102, 1);
        font-size: 1.2rem;
    }

    .operting-log {
        height: 3rem;
        width: 90%;
        margin: auto;
        text-align: left;
        line-height: 3rem;
        color: rgba(102, 102, 102, 1);
        font-size: 1.2rem;
    }

    .remote-control-warning {
        height: 7rem;
        width: 85%;
        margin: auto;
        text-align: left;
        font-size: 1rem;
    }

    .control-btn-container {
        position: relative;
        height: 17%;
        width: 90%;
        margin: auto;
        font-size: 1rem ;
    }

    .start-btn {
        border: 0;
        position: relative;
        margin-left: 1rem;
        width: 40%;
        float: left;
        height: 100%;
        background-color: #00c5aa;
        border-radius: 7px;
        color: white;
        text-align: center;
        line-height: 2.55rem;

        .control-span {
            display: inline-block;
            width: 100%;
            height: 100%;
            line-height: 2.55rem;
            font-size: 1rem;
        }
    }

    .stop-btn {
        outline: none;
        position: relative;
        width: 40%;
        float: right;
        margin-right: 1rem;
        height: 100%;
        background-color: #00c5aa;
        color: white;
        border: none;
        border-radius: 7px;
        text-align: center;

        .control-span {
            display: inline-block;
            width: 100%;
            height: 100%;
            line-height: 2.55rem;
            font-size: 1rem;
        }
    }

    .operating-detail {
        height: 4.5rem;
        width: 85%;
        margin: auto;
        font-size: 1rem;
        text-align: center;
    }

    .page {
        width: 80%;
        left: 50%;
        margin-left: -40%;
        height: 2rem;
        position: absolute;
        bottom: 0;
    }

    .loading-block {
        display: none;
        position: fixed;
        height: 100vh;
        width: 100%;
        z-index: 10000000;
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
        height: 100vh;
        width: 100%;
        position: absolute;
    }
</style>
<template>
    <div class="control-page">
        <div class="loading-block" ref="block">
            <!--加载动画-->
            <Col class="demo-spin-col" span="8">
                <Spin fix>
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"
                          style="background-color: transparent"></Icon>
                    <div>正在建立通信</div>
                </Spin>
            </Col>
        </div>

        <div class="printer-num-contaniner">
            <div class="printer-num">{{printName}}</div>
        </div>

        <div class="bottom-container" ref="bottomContainer">
            <div class="remote-control-comtainer">
                <div class="remote-control-title">远程控制模式</div>
                <div class="remote-control-warning">在10分钟之后系统会提示询问是否继续操作，需要确认才能继续操作，否则系统会默认退出操作界面。</div>
                <div class="control-btn-container">
                    <button type="primary" :loading="loading"
                            class="start-btn"
                            v-if="suspendShow">
                        <span v-if="!loading" class="control-span" @click="showSuspendConfirm" style="font-size: 1rem">暂停</span>
                        <span style="font-size: 1rem" v-else>正在操作...</span>
                    </button>
                    <button type="primary"
                            :loading="loading2"
                            class="start-btn"
                            v-if="resumeShow">
                        <span v-if="!loading2" class="control-span" @click="showResumeConfirm" style="font-size: 1rem">恢复</span>
                        <span style="font-size: 1rem" v-else>正在操作...</span>
                    </button>
                    <button type="primary" :loading="loading3" class="stop-btn">
                        <span class="control-span" v-if="!loading3" @click="showStopConfirm" style="">停止</span>
                        <span v-else>正在操作...</span>
                    </button>
                </div>
            </div>
            <div class="operting-log">本设备最近远程操作流水</div>
            <div class="operating-history" ref="operatingLog">
                <Tabs value="最近一天" @on-click="getTaskLine">
                    <TabPane label="最近一天" name="最近一天"></TabPane>
                    <TabPane label="最近一周" name="最近一周"></TabPane>
                    <TabPane label="最近一个月" name="最近一个月"></TabPane>
                </Tabs>
                <div class="operating-detail" v-for="(task, index) in tempLine" :key='index'>
                    <div style="text-align: left;height: 1.5rem">{{ task.work}}</div>
                    <div style="text-align: left;height: 1.5rem">{{ task.username}}</div>
                    <div style="text-align: left;height: 1.5rem">{{ task.time}}</div>
                    <div style="height: 1px; background-color: #eaecef;"></div>
                </div>

                <div class="page">
                    <Page :current="PageIndex"
                          simple
                          :page-size="4"
                          :total="operationLine.length"
                          style="width: 100%"
                          @on-change="addTask"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getModule} from 'vuex-module-decorators';
    import store from '../../../../store';
    import MonitorModules from '../../../../store/modules/MonitorModules'

    const monitorModules = getModule(MonitorModules, store);

    let stopStatus = null
    let controlStatus = null
    let timeQuery = null
    let recordToken = null
    let initControl = 0
    let exitStatus = 0
    export default {
        data() {
            return {
                deviceId: this.$route.query.id,
                loading: false,
                loading2: false,
                loading3: false,
                printName: this.$route.query.printerName,
                suspendShow: false,
                resumeShow: false,
                timeout: true,
                websock: '',
                onLine: null,
                operationLine: [],
                tempLine: [],
                time: [
                    "最近一天",
                    "最近一周",
                    "最近一个月"
                ],
                setTime: null,
                inqueryIndex: '最近一天',
                PageIndex: 1
            }
        },
        mounted() {
            this.getToken()
            //进来的时候默认先那一次天的数据
            this.getTaskLine(this.inqueryIndex)
            this.checkHide()
            this.timeoutInquiry()
        },

        beforeDestroy() {
            document.documentElement.style.fontSize = "16px";
            clearTimeout(this.setTime)
            initControl = 0
            clearInterval(this.onLine)
            this.listenEvent()
            if (this.websock != '') {
                this.sendLockMessage()
                this.websock.close()
            }
        },

        //todo printerdata 页面刷新页面websocket炸了不发close，价格判空逻辑判断
        methods: {
            listenEvent() {
                window.onbeforeunload = function (e) {
                    this.sendLockMessage()
                }

                window.onunload = function () {
                    this.sendLockMessage()
                }
            },
            /**
             *  获取操作流水
             */
            getTaskLine(index) {
                this.inqueryIndex = index

                this.operationLine.length = 0
                let time = null
                if (index === '最近一天') {
                    time = "day"
                } else if (index === '最近一周') {
                    time = "week"
                } else if (index === '最近一个月') {
                    time = "month"
                }

                let dataObj = {
                    time: time,
                    serialNumber: this.$route.query.serialNumber
                }

                monitorModules.getTaskRecord(dataObj).then((res) => {
                    if (res.code == "3001") {
                        localStorage.removeItem('AuthorizationAdmin')
                        this.$router.push({name: "login"});
                        this.$Message.error(res.message)
                    } else if (res.code == "-1") {
                        this.$Message.error(res.message)
                    } else {
                            this.operationLine = res.data
                            this.addTask(1)
                    }
                })
            },

            /**
             * 根据页码显示操作流水
             */
            addTask(pageNumber) {
                this.tempLine.length = 0
                if(this.operationLine.length === 0) {
                    return false
                }
                this.PageIndex = pageNumber
                for (let i = 4 * (this.PageIndex-1) ; i < 4 * this.PageIndex && i < this.operationLine.length; i++) {
                    this.tempLine.push({
                        work: '操作:' + this.operationLine[i].operate,
                        username: '操作员:' + this.operationLine[i].username,
                        time: '时间:' + this.operationLine[i].time
                    })
                }
            },

            /**
             * 初始化WebSocket通道
             */
            initWebSocket(token) { //初始化websocket
                //todo 服务器异常连接断开要处理一下
                let url = "ws://47.102.85.36:8848/" + token + '$' + this.$route.query.serialNumber

                this.websock = new WebSocket(url);

                this.websock.onopen = this.websocketonopen;
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
            },

            /**
             * WebSocket接收信息回调函数
             */
            websocketonmessage(evt) { //数据接收
                let statusJudge = JSON.parse(evt.data);

                if (statusJudge.code == 0) {
                    //输出文字信息
                    this.$Message.warning(statusJudge.data)
                    this.loading = this.loading2 = this.loading3 = false
                } else if (statusJudge.code == 1) {
                    //获取打印机状态
                    let str = evt.data;
                    let received_msg = JSON.parse(str).data

                    //改变操作按钮的显示状态
                    if (received_msg.status == "正在作业") {
                        this.resumeShow = false
                        this.suspendShow = true
                        stopStatus = false
                    } else if (received_msg.status == "作业由用户暂停" || received_msg.status == "作业被动暂停") {
                        this.resumeShow = true
                        this.suspendShow = false
                        stopStatus = false
                    } else if (received_msg.status == "作业由用户停止" || received_msg.status == "作业被动停止" || received_msg.status == "作业正常结束") {
                        this.resumeShow = false
                        this.suspendShow = false
                        stopStatus = true
                        //停止后提示用户退出界面,先锁住所有按钮
                        stopStatus = true
                        controlStatus = true
                        if(exitStatus === 0) {
                            exitStatus = 1
                            this.$Notice.success({
                                title: '操作提醒',
                                desc: '作业已中止,无法继续进行控制。5秒后为你退出控制页面',
                                duration: 6
                            });
                            setTimeout(() => {
                                this.$router.go(-1);
                            }, 2000)
                        }
                    }
                    this.loading = this.loading2 = this.loading3 = false
                    this.getTaskLine(this.inqueryIndex)
                } else if (statusJudge.code == 2 || statusJudge.code == "2") {
                    if (statusJudge.data == '该打印机正在被其他用户锁定，请等待该用户操作完成') {
                        this.$router.replace({name: 'printerData', query: this.tranFormData()});
                    } else if (statusJudge.data == '操作成功') {
                        controlStatus = false
                    }
                    if (initControl != 0) {
                        this.$Message.warning(statusJudge.data)
                    }
                    initControl = 1;
                    this.loading = this.loading2 = this.loading3 = false
                }
                controlStatus = false
                statusJudge = null
            },

            /**
             * Websocket通道打开发送上锁指令
             */
            websocketonopen() {
                if (initControl == 0) {
                    this.websock.send("CONTROL$LOCK")
                }
            },

            /**
             * Websocket通道错误回调函数
             */
            websocketonerror() {//连接建立失败重连
                //todo 不知道这个正不正确，需要检验一下
                // this.$data.loading2 = this.$data.loading = this.$data.loading3 = false
                // controlStatus = stopStatus = false
                // this.$data.websock.close()
                // this.initWebSocket(recordToken)
            },

            /**
             * 根据设计稿调整rem单位大小
             */
            resizeRem() {
                let whdef = 100 / 375;
                let wW = window.screen.availWidth
                let rem = wW * whdef
                document.documentElement.style.fontSize = rem + 'px'
            },

            /**
             * 获取打开websocket通道的token
             */
            getToken() {
                monitorModules.GetWsToken(this.$route.query.serialNumber).then((res) => {
                    if (res.code === "3001") {
                        localStorage.removeItem('AuthorizationAdmin')
                        this.$router.push({name: "login"});
                    } else {
                        if (res.code === "-1") {
                            this.$Modal.error({
                                title: "错误",
                                content: res.message
                            });
                        } else {
                            recordToken = res.data
                            this.initWebSocket(res.data)
                        }
                    }
                })
            },

            /**
             * 超时询问
             */
            timeoutInquiry() {
                //设置十分钟超时询问
                this.setTime = setTimeout(() => {
                    timeQuery = setTimeout(() => {
                        this.$router.replace({name: 'printerData', query: this.tranFormData()});
                        this.$Modal.remove()
                    }, 10000)

                    this.$Modal.confirm({
                        title: '操作提醒',
                        content: '<p>控制已超十分钟，请问还要继续控制吗</p>',
                        okText: '继续控制',
                        cancelText: '退出控制',
                        onOk: () => {
                            clearTimeout(timeQuery)
                            this.timeoutInquiry()
                        },
                        onCancel: () => {
                            this.setTime = null
                            this.$router.replace({name: 'printerData', query: this.tranFormData()});
                            this.timeoutInquiry()
                        }
                    });
                }, 600000)
            },

            tranFormData() {
                return {
                    id: this.$route.query.serialNumber,
                    printerName: this.$route.query.printerName
                }
            },

            /**
             * 恢复操作确认
             */
            showResumeConfirm() {
                if (stopStatus) {
                    return
                }
                controlStatus = true
                this.loading2 = true
                this.$Modal.confirm({
                    title: '操作确认',
                    content: '<p>确认要恢复吗</p>',
                    onOk: () => {
                        this.sendResumeMessage()
                    },
                    onCancel: () => {
                        this.cancelResume();
                    }
                });
                // controlStatus = true
                // this.$data.modal9 = true
                // this.$data.loading2 = true
            },

            /**
             * 暂停操作操作确认
             */
            showSuspendConfirm() {
                if (stopStatus) {
                    return
                }
                controlStatus = true
                this.loading = true
                this.$Modal.confirm({
                    title: '操作确认',
                    content: '<p>确认要暂停吗</p>',
                    onOk: () => {
                        this.sendSuspendMessage()
                    },
                    onCancel: () => {
                        this.cancelSuspend();
                    }
                });
            },

            /**
             * 停止操作操作确认
             */
            showStopConfirm() {
                if (controlStatus) {
                    return
                }
                stopStatus = true
                this.loading3 = true
                this.$Modal.confirm({
                    title: '操作确认',
                    content: '<p>确认要停止吗</p>',
                    onOk: () => {
                        this.sendStopMessage()
                    },
                    onCancel: () => {
                        this.cancelStop();
                    }
                });
            },


            /**
             * 网络不通畅的时候处理。
             */
            checkHide() {
                window.addEventListener('beforeunload', e => {
                    this.websock.close()
                    clearTimeout(this.setTime)
                    window.clearInterval(this.onLine)
                    if (recordToken != null) {
                        clearTimeout(recordToken)
                    }
                });

                this.onLine = setInterval(() => {
                    if (this.websock != '') {
                        if (this.websock.readyState == this.websock.CLOSED) {
                            clearInterval(this.onLine)
                            this.websock.close()
                            window.location.reload()
                        }
                    }
                }, 3000)
            },

            /**
             * 恢复的时候取消动画
             */
            cancelResume() {
                this.loading2 = false
                controlStatus = false
            },

            /**
             * 停止的时候取消动画
             */
            cancelSuspend() {
                this.loading = false
                controlStatus = false
            },

            /**
             * 暂停的时候取消动画
             */
            cancelStop() {
                this.loading3 = false
                stopStatus = false
            },

            /**
             *  发送暂停指令
             */
            sendSuspendMessage() {
                this.websock.send("CONTROL$SUSPEND")
            },

            /**
             * 发送解锁指令
             */
            sendLockMessage() {
                this.websock.send("CONTROL$UNLOCK")
            },

            /**
             * 发送恢复指令
             */
            sendResumeMessage() {
                this.websock.send("CONTROL$RESUME")
            },

            /**
             * 发送停止指令
             */
            sendStopMessage() {
                this.websock.send("CONTROL$STOP")
            },

        },
    }

</script>