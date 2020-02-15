<style>
    .bottom-contanier {
        height: auto;
        width: 100%;
        overflow: scroll;
        padding-top: 50px;
    }

    .Data-template {
        position: absolute;
        width: 100%;
        overflow-x: hidden;
    }

    .data-model {
        width: 100%;
        overflow-x: hidden;
    }

    .printer-num-contaniner {
        background-color: white;
        height: 50px;
        width: 100%;
        margin: auto;
        text-align: center;
        font-size: 20.8px;
        z-index: 99;
        position: fixed;
    }

    /*.editName-entrance{*/
    /*    vertical-align: top;*/
    /*    display: inline-block;*/
    /*    height: 50px;*/
    /*    width: 0.3rem;*/
    /*    right: 0px;*/
    /*    background-image: url(../../../assets/edit.png);*/
    /*    background-size: 64%;*/
    /*    background-repeat: no-repeat;*/
    /*    background-position: center;*/
    /*    text-decoration: none;*/
    /*}*/

    .printer-num {
        position: absolute;
        left: 50%;
        height: 50px;
        width: 260px;
        margin-left: -130px;
        text-align: center;
        font-size: 20.8px;
        background-color: white;
        z-index: 100;
        line-height: 50px;
    }

    .name {
        vertical-align: top;
        display: inline-block;
        height: 50px;
        font-weight: bold
    }

    /*.history-task-entrance {*/
    /*    position: absolute;*/
    /*    height: 50px;*/
    /*    width: 0.5rem;*/
    /*    right: 0;*/
    /*    background-image: url(../../../assets/history.png);*/
    /*    background-size: 64%;*/
    /*    background-repeat: no-repeat;*/
    /*    background-position: center;*/
    /*    text-decoration: none;*/
    /*}*/

    .print-process-time {
        height: 1.5rem;
        width: 100%;
        font-size: 0;
        background-color: white;
    }

    .remain-time-container {
        display: inline-block;
        height: 100%;
        width: 31%;
        font-size: 0.001rem;
        vertical-align: top;
    }

    .process-circle {
        display: inline-block;
        height: 100%;
        width: 38%;
    }

    .finish-time-container {
        display: inline-block;
        height: 100%;
        width: 31%;
        vertical-align: top;
    }

    .remain-time, .finsh-time {
        height: 40%;
        width: 77%;
        margin: auto;
        margin-top: 36px;
        vertical-align: middle;
    }

    .print-status {
        height: 100%;
        width: 40%;
        float: right;
        margin-right: 5%;
        line-height: 0.4rem;
        font-size: 0.15rem;
        color: #999999
    }

    .approximate-time, .finsh-approximate-time {
        height: 60%;
        width: 100%;
        line-height: 28.8px;
        font-size: 0.2rem;
        font-weight: 500;
    }

    .approximate-title, .finsh-approximate-title {
        height: 40%;
        width: 100%;
        line-height: 19.2px;
        font-size: 0.14rem;
        color: rgba(153, 153, 153, 1);
        font-weight: 400;
    }

    .demo-Circle-custom h1 {
        color: #3f414d;
        font-size: 0.23rem;
        font-weight: normal;
        margin: auto;
        margin-top: 20px;
        text-align: center;
    }

    .demo-Circle-custom p {
        color: #657180;
        font-size: 10px;
        margin: 10px 0 15px;
    }

    .control-btn {
        height: 0.4rem;
        width: 100%;
        background-color: white;
        margin-bottom: 0.2rem;
    }

    .lock-btn {
        float: left;
        height: 100%;
        width: 50%;
        background-color: #00c5aa;
        text-align: center;
        margin-left: 5%;
        line-height: 0.4rem;
        font-size: 0.15rem;
        color: white;
        border-radius: 6px;
    }
</style>

<template>
    <div class="Data-template">
        <div class="data-model">
            <div class="printer-num-contaniner">
                <div class="printer-num">
                    <div class="name">{{printerNum}}</div>
                </div>
            </div>

            <div class="bottom-contanier">
                <div class="print-process-time">
                    <div class="remain-time-container">
                        <div class="remain-time">
                            <div class="approximate-time">{{reservetime}}</div>
                            <div class="approximate-title">剩余时间</div>
                        </div>
                    </div>
                    <div class="process-circle">
                        <i-circle
                                style="height: 1.12rem;width: 1.2rem;"
                                :trail-width="8"
                                :stroke-width="10"
                                :percent="percent"
                                :trail-color="trailcolor"
                                stroke-linecap="square"
                                :stroke-color="processcolor"
                        >
                            <div class="demo-Circle-custom">
                                <h1 v-if="hasShow">{{ percent }}%</h1>
                                <h1 v-if="noneShow">{{ percentWord }}</h1>
                                <p>打印进度</p>
                            </div>
                        </i-circle>
                    </div>
                    <div class="finish-time-container">
                        <div class="finsh-time">
                            <div class="finsh-approximate-time">{{finishtime}}</div>
                            <div class="finsh-approximate-title">作业完成时间</div>
                        </div>
                    </div>
                </div>
                <div class="control-btn">
                    <!--                    <div class="lock-btn" v-on:click="sendControlMessage">进入远程操作模式</div>-->
                    <div class="lock-btn" v-on:click="sendControlMessage" ref="controlBtn">进入远程操作模式</div>

                    <!-- <div class="lock-btn"></div> -->
                    <div class="print-status">{{machineStatus}}</div>
                </div>

                <RealTimedata
                        v-bind:projectname="projectname"
                        v-bind:machineStatus="machineStatus"
                        v-bind:abnormail="abnormail"
                        v-bind:printime="printime"
                        v-bind:Layerwork="Layerwork"
                        v-bind:worktemperature="worktemperature"
                        v-bind:buckettemperature="buckettemperature"
                        v-bind:oxygencontent="oxygencontent"
                        v-bind:availabletime="availabletime"
                        v-bind:Nitrogen="Nitrogen"
                        v-bind:workbenchPower="workbenchPower"
                        v-bind:bottomtemperature="bottomtemperature"
                        v-bind:reason="reason"
                        v-bind:usedtime="usedtime"
                        v-bind:layertime="layertime"
                        v-bind:printheight="printheight"
                        v-bind:componentNumber="componentNumber"
                >

                </RealTimedata>
            </div>
        </div>
    </div>
</template>

<script>
    import RealTimedata from "./RealTimedata/RealTimedata.vue";
    import {getModule} from 'vuex-module-decorators';
    import store from '../../../../store';
    import MonitorModules from '../../../../store/modules/MonitorModules'

    const monitorModules = getModule(MonitorModules, store);
    let Recordtoken = null
    let onLine = null;
    let lockReconnect = false;
    // let lockControl = null;
    export default {
        components: {RealTimedata},
        data() {
            return {
                websock: '',
                percentWord: '暂无',
                hasShow: false,
                noneShow: false,
                percent: 0,
                printerNum: this.$route.query.printerName,
                reservetime: '暂无',
                finishtime: "暂无",
                projectname: "暂无",
                machineStatus: "暂无",
                abnormail: "暂无",
                printime: '暂无',
                Layerwork: "暂无",
                layertime: "暂无",
                worktemperature: "暂无",
                workbenchPower: "暂无",
                buckettemperature: '暂无',
                oxygencontent: "暂无",
                Nitrogen: "暂无",
                availabletime: this.$route.query.expire,
                bottomtemperature: "暂无",
                reason: "暂无",
                usedtime: '暂无',
                componentNumber: '暂无',
                printheight: '暂无'
            };
        },
        mounted() {
            document.title = "实时监控"
            this.resizeRem()
            this.getToken();
            // this.isOnline()
        },

        beforeDestroy: function () {
            document.documentElement.style.fontSize = "16px";
            clearInterval(onLine)
            if (this.websock != '') {
                this.websock.close()
            }
        },

        computed: {
            /**
             * @param : 改变进度条的颜色
             * @description 思路描述
             */
            trailcolor() {
                let color = "#eaeef2";//默认颜色，如果报警改变背景颜色。
                // 判断如果发生了异常
                if (this.abnormail != '暂无') {
                    return "#F77777"
                }
                return color;
            },

            processcolor() {
                let normalcolor = "#00c5aa"
                if (this.machineStatus == "离线" || this.machineStatus == "未监控") {
                    return "#999999"
                }
                return normalcolor
            }
        },

        methods: {
            /**
             * @param : 判空
             * @description 判断后台传来的数据是否为null，是null的话转变显示方式
             */
            isnull(json) {
                if (json == null) {
                    for (let k in this.$data) {
                        if (k == "printerNum" || k == "websock" || k == "hasShow" || k == "noneShow" || k == "percent") {
                            continue
                        }
                        this.$data[k] = "暂无"
                    }
                    return
                } else {
                    for (let i in json) {
                        if (json[i] == null) {
                            json[i] = "暂无"
                        }
                    }
                }
            },
            resizeRem() {
                let whdef = 100 / 375;
                let wH = window.screen.availHeight
                let wW = window.screen.availWidth
                let rem = wW * whdef
                document.documentElement.style.fontSize = rem + 'px'
            },

            /**
             * 把后台传过来的时间转变为百分数.
             */
            changePercent(usertime, remaintime) {
                let alltime = usertime + remaintime
                let point = Number(usertime / alltime)
                if (usertime == "暂无" || remaintime == '暂无' && this.machineStatus != '作业正常结束') {
                    this.hasShow = true
                    this.noneShow = false
                    return 0
                } else if (remaintime < 0) {
                    this.hasShow = true
                    this.noneShow = false
                    return 99
                } else if (this.machineStatus == '作业正常结束') {
                    this.hasShow = false
                    this.noneShow = true
                    return '完成'
                }
                if (Number(point * 100).toFixed() == 100) {
                    return 99
                }
                this.hasShow = true
                this.noneShow = false
                return Number(Number(point * 100).toFixed())
            },

            /**
             * 显示完成时间
             */
            allTime(usedTime, remainTime) {
                if (usedTime === '暂无' || remainTime === '暂无') {
                    return '暂无'
                }

                let allTime = Number(usedTime) + Number(remainTime)
                return this.formatSeconds(allTime)
            },

            /**
             * 数值如果是暂无则去掉单位如果是数值则补上单位
             */
            AddUnit(value, NumericalType) {
                if (value === '暂无') {
                    return '暂无'
                } else if (NumericalType === 'temperature') {
                    return value + '°C'
                } else if (NumericalType === 'Concentration' || NumericalType === 'Power') {
                    return value + '%'
                } else if (NumericalType === 'Layer') {
                    return value + '层'
                } else if (NumericalType === 'PrintHeight') {
                    return value + 'mm'
                } else if (NumericalType === 'ComponentNumber') {
                    return value + '件'
                } else if (NumericalType === 'Abnormal') {
                    let list_str = ''
                    for (let i = 0; i < value.length; i++) {
                        list_str += value[i] + ' '
                    }
                    return list_str
                } else if (NumericalType === 'ComponentNumber') {
                    return value + '件'
                }
            },

            /**
             * 对进度环剩余时间的处理，当显示负数的时候显示即将完成。
             */
            changeHour(time, timetype) {
                if (time == '暂无') {
                    return '暂无'
                }

                if (timetype == "reservetime") {
                    if (time >= 3600) {
                        return (Number(time) / 3600).toFixed(1) + "h"
                    } else if (time < 3600 && time >= 60) {
                        return (Number(time) / 60).toFixed() + "min"
                    } else if (time < 60 && time > 0) {
                        return Number(time) + "s"
                    } else if (time < 0) {
                        return '即将完成'
                    }
                } else {
                    return this.formatSeconds(time)
                }
            },

            /**
             * @param : 切割时间字符串方法
             * @description
             */
            splitTimestr(timestr) {
                if (timestr == '暂无') {
                    return '暂无'
                }
                let strArray = timestr.split(' ')
                let newStr = strArray[1]

                return newStr
            },

            formatSeconds(value) {
                let result = parseInt(value)
                let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
                let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
                let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
                result = `${h}:${m}:${s}`
                return result
            },

            initWebSocket(token) {
                let id = this.$route.query.serialNumber

                let url = "ws://47.102.85.36:8848/" + token + '$' + id

                this.websock = new WebSocket(url);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
            },

            websocketonerror() {
                this.reconnect();
            },

            websocketonmessage(evt) {
                let statusJudge = JSON.parse(evt.data);

                if (statusJudge.code == 0) {
                    //输出文字信息
                    this.$Modal.error({
                        title: "错误",
                        content: statusJudge.data
                    });
                } else if (statusJudge.code == 1) {
                    //获取打印机状态
                    let str = evt.data;
                    let received_msg = JSON.parse(str).data
                    //显示空就全部显示暂无
                    this.isnull(received_msg)

                    //改变此时locked的状态
                    if (received_msg == null || received_msg.isLocked == true) {
                        this.$refs.controlBtn.style.backgroundColor = "grey"
                    } else {
                        this.$refs.controlBtn.style.backgroundColor = "#00c5aa"
                    }

                    if (received_msg != null) {
                        //文件名称，正确
                        this.projectname = received_msg.taskName

                        //已用时间，正确
                        this.usedtime = this.changeHour(received_msg.usedTime)

                        //剩余时间，正确
                        this.reservetime = this.changeHour(received_msg.remainingTime, "reservetime")

                        //机器状态，正确
                        if (received_msg.isOnline == false) {
                            this.machineStatus = "离线"
                        } else {
                            this.machineStatus = received_msg.status
                        }

                        //打印总时间
                        this.printime = this.allTime(received_msg.remainingTime, received_msg.usedTime)

                        //异常信息
                        this.abnormail = this.AddUnit(received_msg.errorList, "Abnormal")

                        //打印层数
                        this.Layerwork = this.AddUnit(received_msg.layer, "Layer")

                        //打印总层数
                        this.layertime = this.AddUnit(received_msg.layerNumber, "Layer")

                        //工作台温度
                        this.worktemperature = this.AddUnit(received_msg.workbenchTemperature, 'temperature')

                        //成型桶温度
                        this.buckettemperature = this.AddUnit(received_msg.bucketTemperature, 'temperature')

                        //氧气含量，不知道单位
                        this.oxygencontent = this.AddUnit(received_msg.oxygenConcentration, 'Concentration')

                        //完成时间，正确
                        this.finishtime = this.splitTimestr(received_msg.endTime)

                        //氮气状态，正确
                        this.Nitrogen = received_msg.nitrogenStatus

                        //桶底温度
                        this.bottomtemperature = this.AddUnit(received_msg.bottomTemperature, 'Temperature')

                        //作业高度
                        this.printheight = this.AddUnit(received_msg.printHeight, 'PrintHeight')

                        //作业零件数量
                        this.componentNumber = this.AddUnit(received_msg.componentNumber, 'ComponentNumber')

                        //百分数进度
                        if (received_msg.isOnline == false) {
                            this.percent = this.changePercent(received_msg.usedTime, received_msg.remainingTime)
                            this.hasShow = false
                            this.noneShow = true
                            this.percentWord = "离线"
                            this.$refs.controlBtn.style.backgroundColor = "grey"
                        } else {
                            this.percent = this.changePercent(received_msg.usedTime, received_msg.remainingTime)
                        }

                        //停止原因，正确
                        this.reason = received_msg.reason

                        //工作台功率，正确
                        this.workbenchPower = this.AddUnit(received_msg.workbenchPower, 'Power')
                    } else {
                        this.hasShow = false
                        this.noneShow = true
                        this.percentWord = "未监控"
                        this.machineStatus = "未监控"
                        this.$refs.controlBtn.style.backgroundColor = "grey"
                    }

                } else if (statusJudge.code === "2" || statusJudge.code === 2) {
                    //显示控制结果
                    this.$Modal.error({
                        title: "错误",
                        content: statusJudge.data
                    });
                }
            },

            /**
             * websocket断开事件
             */
            websocketclose(e) {
            },

            /**
             * websocket断线重连
             */
            reconnect() {
                let that = this
                if (lockReconnect) return;
                lockReconnect = true;
                //没连接上会一直重连，设置延迟避免请求过多
                setTimeout(function () {
                    that.getToken();
                    // lockReconnect = false;
                }, 2000);
            },

            /**
             * 判断用户能否进度控制页面
             */
            sendControlMessage() {
                let infoObj = {
                    serialNumber: this.$route.query.serialNumber,
                    Recordtoken: Recordtoken,
                }
                monitorModules.enterControlPermission(infoObj).then((res) => {
                    if (res.code === "3001") {
                        localStorage.removeItem('AuthorizationAdmin')
                        this.$router.push({name: "login"});
                        this.$Modal.error({
                            title: "错误",
                            content: res.message
                        });
                    } else if (res.code == 1) {
                        this.$router.push({
                                name: "control", query: {
                                    serialNumber: this.$route.query.serialNumber,
                                    printerName: this.$route.query.printerName
                                }
                            }
                        );
                    } else {
                        this.$Modal.error({
                            title: "错误",
                            content: res.message
                        });

                    }
                })
            },

            /**
             * 获取打开WebSocket通道的token
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
                            Recordtoken = res.data
                            this.initWebSocket(res.data)
                        }
                    }
                })
            },

            /**
             * 监控websocket心跳
             */
            // isOnline() {
            //     onLine = setInterval(() => {
            //         if (this.websock != '') {
            //             if (this.websock.readyState == this.websock.CLOSED) {
            //                 this.websock.close()
            //                 window.location.reload()
            //             }
            //         }
            //     }, 3000)
            // }

        },
    }
</script>