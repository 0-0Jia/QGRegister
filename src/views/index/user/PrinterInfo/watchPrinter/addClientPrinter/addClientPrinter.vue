<style scoped lang="scss">
    .watchPrinter-container {
        width: 100%;
        height: 100vh;
    }

    .watchPrinter-header {
        height: 50px;
        width: 100%;
        position: fixed;
        background-color: white;


        div {
            height: 100%;
            width: 70%;
            margin: auto;
            line-height: 50px;
            font-size: 1.3rem;
        }
    }

    .add-user-btn {
        position: fixed;
        right: 20px;
        top: 50%;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .bottom-container {
        padding-top: 50px;
        width: 90%;
        margin: auto;
        overflow: scroll;
    }

    .form-data-container {
        height: 2rem;
        width: 95%;
        margin: 1rem auto;
        text-align: left;

        .input-title {
            display: inline-block;
            height: 100%;
            width: 30%;
            line-height: 2rem;
            font-size: 1rem;
        }

        .input-container {
            position: relative;
            display: inline-block;
            height: 100%;
            width: 70%;
            line-height: 2rem;
            vertical-align: top;
            text-align: left;

            input {
                height: 100%;
                width: 100%;
                padding-left: 7px;
                border-radius: 4px;
                outline: none;
                vertical-align: top;
                border: 1px solid #dcdee2;
                -webkit-appearance: none;
            }

            .QR-code {
                position: absolute;
                top: 0.1rem;
                right: 0.1rem;
                height: 90%;
                width: 10%;
                background-color: white;
                background-image: url("../../../../../../assets/scanQR.png");
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100%;
            }
        }

        .select-time {
            height: 100%;
            width: 100%;
            padding-left: 7px;
            border-radius: 4px;
            outline: none;
            vertical-align: top;
            border: 1px solid #dcdee2;
        }


        .transaction-checkbox-container {
            display: inline-block;
            height: 100%;
            width: 70%;
            text-indent: 10px;
            line-height: 2rem;
            vertical-align: top;
            text-align: left;
        }
    }

    .confirm-btn {
        height: 2.5rem;
        width: 90%;
        margin: auto;
        background-color: #00C5AA;
        line-height: 2.5rem;
        text-align: center;
        border-radius: 6px;
        color: white;
        font-size: 1rem;
    }
</style>

<template>
    <div class="watchPrinter-container">
        <!-- 时间选择器 -->
        <wv-datetime-picker
                ref="picker"
                type="date"
                :startDate='time.nowDate'
                :endDate='time.endDate'
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                v-model="time.pickerValue"
                @confirm="SelectTime"
        >
        </wv-datetime-picker>

        <div class="watchPrinter-header">
            <div class="watchPrinter-title">
                添加打印机
            </div>
        </div>

        <div class="bottom-container">
            <div class="form-data-container">
                <div class="input-title"><span style="color: red">* </span>交易商户:</div>
                <div class="input-container">
                    <input v-model="ClientName" style="width: 100%;background-color: #e2dddd" disabled/>
                </div>
            </div>

            <div class="form-data-container">
                <div class="input-title"><span style="color: red">* </span>序列号:</div>
                <div class="input-container">
                    <!--                    <Input :value="DeviceSerialNumber" style="width: 100%"/>-->
                    <input v-model="DeviceSerialNumber"></input>
                    <div @click="wxConfig" class="QR-code"></div>
                </div>
            </div>

            <div class="form-data-container">
                <div class="input-title"><span style="color: red">* </span>交易类型:</div>
                <div class="transaction-checkbox-container">
                    <RadioGroup v-model="transactionType">
                        <Radio label="买断"></Radio>
                        <Radio label="租用"></Radio>
                    </RadioGroup>
                </div>
            </div>

            <transition name="fade">
                <div class="form-data-container" v-if="isShowTime">
                    <div class="input-title"><span style="color: red">* </span>过期日期:</div>
                    <div class="input-container"  @click="openDatePicker">
                        <div style="width: 100%" class="select-time">{{UsedDate}}</div>
                    </div>
                </div>
            </transition>

            <div class="confirm-btn" @click="Inquiry()">确定</div>
        </div>
    </div>
</template>
<script>
    import {getModule} from 'vuex-module-decorators';
    import store from '../../../../../../store';
    import ClientModules from '../../../../../../store/modules/ClientModules'
    import {isNotNullTrim} from "../../../../../../utils/shared/isNotNullTrim";
    import {DateFormat} from "../../../../../../utils/shared/ModifyDateFormat";
    import wx from 'weixin-js-sdk'

    const clientModules = getModule(ClientModules, store);

    export default {
        data() {
            return {
                ClientName: this.$route.query.name,
                DeviceSerialNumber: null,
                UsedDate: null,
                transactionType: null,
                time: {
                    nowDate: new Date(new Date().getTime()),
                    pickerValue: null
                },
                defendClick: false,
                isShowTime: false
            }
        },
        mounted() {
        },
        watch: {
            /**
             * 根据选择的类型判断是否出现时间选择框
             */
            transactionType: function () {
                if(this.transactionType === '买断') {
                    this.isShowTime = false
                } else {
                    this.isShowTime = true
                }
            }
        },
        methods: {
            /**
             * 帮助客户添加打印机的数据检查并提交到后台
             */
            submitInformation() {
                let data = null
                for (let i in this.$data) {
                    if (this.$data[i] == null || !isNotNullTrim(this.$data[i])) {
                        if(i !== 'time' && i !== 'isShowTime' && i !== 'isShowTime' && i !== 'UsedDate') {
                            this.$Message.error('输入不能为空');
                            return
                        }
                    }
                }
                //根据买断还是租用给后台发送不同的时间
                if(this.transactionType === '买断') {
                    data = {
                        "userId": Number(this.$route.query.userId),
                        "serialNumber": this.DeviceSerialNumber,
                        "time": "2099-1-2 00:00:00"
                    }
                } else {
                    data = {
                        "userId": Number(this.$route.query.userId),
                        "serialNumber": this.DeviceSerialNumber,
                        "time": this.UsedDate + ' 00:00:00'
                    }
                }

                if(this.UsedDate === null && !isNotNullTrim(this.UsedDate) && this.transactionType === '租用') {
                    this.$Message.error('请检查你输入的信息');
                    return;
                }

                clientModules.addClientPrinterList(JSON.stringify(data)).then((res) => {
                    if (res.code == 3001) {
                        localStorage.removeItem('Authorization')
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
                            this.$Message.info('添加成功');
                            this.$router.go(-1);
                        }

                    }
                })
            },

            /**
             * 向后台获取微信js接口签名配置
             */
            wxConfig() {
                if(this.defendClick) {
                    this.$Message.warning('请勿频繁点击');
                    return false
                }
                let that = this
                let url = location.href.split("#")[0]
                this.defendClick = true
                setTimeout(()=> {
                    this.defendClick = false
                }, 2000)

                clientModules.WxJsConfig(encodeURIComponent(url)).then((res) => {
                    if (res.code == 3001) {
                        localStorage.removeItem('Authorization')
                        this.$router.push({name: 'login'})
                        this.$Modal.error({
                            title: "错误",
                            content: res.message
                        });
                    }
                    if (res.code == -1) {
                        this.$Modal.error({
                            title: "错误",
                            content: res.message
                        });
                    } else {
                        wx.config({
                            debug: false,
                            appId: res.data.appId,
                            timestamp: res.data.timestamp,
                            nonceStr: res.data.nonceStr,
                            signature: res.data.signature,
                            jsApiList: ['scanQRCode']
                        });
                        wx.ready(function () {
                            wx.scanQRCode({
                                desc: 'scanQRCode desc',
                                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                                success: (res) => {
                                    that.DecodeQRCode(res.resultStr)
                                }
                            });
                        });
                        wx.error(function (res) {
                        });
                    }
                })
            },

            /**
             * 询问客户是否确定要添加打印机
             */
            Inquiry() {
                this.$Modal.confirm({
                    title: '操作确认',
                    content: '<p>你确认要为客户添加打印机吗</p>',
                    onOk: () => {
                        this.submitInformation();
                    },
                });
            },

            /**
             * 扫码的时候解密序列号
             */
            DecodeQRCode(serial) {
                clientModules.DeCodeQR(serial).then((res) => {
                    if (res.code == 3001) {
                        localStorage.removeItem('Authorization')
                        this.$router.push({name: 'login'})
                        this.$Message.error(res.message);
                    }
                    if (res.code == -1) {
                        this.$Message.error(res.message);
                    } else {
                        this.DeviceSerialNumber = res.data
                    }
                })
            },

            /**
             * 打开时间选择器
             */
            openDatePicker() {
                this.$refs.picker.open()
            },

            /**
             * 确认时间选择
             */
            SelectTime() {
                this.UsedDate = DateFormat(this.time.pickerValue)
            },
        }
    }

</script>
