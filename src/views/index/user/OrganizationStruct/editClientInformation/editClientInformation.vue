<style scoped lang="scss">
    .addClientInformation-container {
        width: 100%;
        background-color: white;
        z-index: 100;
    }

    .addClientInformation-module-title {
        position: fixed;
        height: 50px;
        width: 100%;
        background-color: white;
        top: 0;
        z-index: 50;
    }

    .addClientInformation-module-container {
        height: 50px;
        width: 250px;
        left: 50%;
        margin-left: -125px;
        line-height: 50px;
        font-size: 1.3rem;
        position: fixed;
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
        margin: auto;
        margin-top: 50px;
        overflow: scroll;
    }

    .form-data-container {
        height: 2rem;
        width: 95%;
        margin: 1rem auto;

        .input-title {
            display: inline-block;
            height: 100%;
            width: 25%;
            line-height: 2rem;
            text-align: left;
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

    .create-time-container {
        height: 2.5rem;
        width: 90%;
        margin: auto;
        text-align: left;
    }

    .create-time-title {
        display: inline-block;
        height: 100%;
        width: 35%;
        line-height: 2.5rem;
        text-align: left;
        vertical-align: top;
    }

    .create-time {
        display: inline-block;
        height: 100%;
        width: 65%;
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

    .change-password {
        background-color: #00C5AA;
    }

    .check-son-account {
        background-color: #F7F7F7;
    }

    .check-printer {
        background-color: white;
    }

    .modify-password-container {
        position: absolute;
        top: 30%;
        right: 0;
        height: 30px;
        width: 70px;
        background-color: black;
        opacity: 0.7;
        line-height: 30px;
        color: white;
        z-index: 20;
        border-radius: 30px 0 0 30px;
        touch-action: none
    }

    .change-password {
        height: 2.5rem;
        width: 88%;
        margin: 1rem auto;
        background-color: #f77777;
        color: white;
        border-radius: 6px;
        line-height: 2.5rem;
        font-size: 1.2rem;
    }
</style>

<template>
    <div class="addClientInformation-container">
        <div class="modify-password-container" @click="toFatherResetPassword"
             @mousedown="down" @touchstart="down"
             @mousemove="move" @touchmove="move"
             @mouseup="end" @touchend="end"
             ref="moveDiv"
        >
            修改密码
        </div>

        <div class="addClientInformation-module-title">
            <div class="addClientInformation-module-container">编辑账户信息</div>
            <div class="save-btn" @click="ConfirmUpdate">保存</div>
        </div>
        <transition name="slide-fade" appear>
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
                        <input v-model="basicInformation.username" placeholder="请输入手机" style="width: 100%"/>
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

                <div class="authority-container">
                    <div class="authority-title"><span style="color: red">* </span>微信端功能权限</div>
                    <div class="authority-select">
                        <CheckboxGroup v-model="authority">
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

                <div class="create-time-container">
                    <div class="create-time-title">创建时间:</div>
                    <div class="create-time">{{loginInfo.createTime}}</div>
                </div>

                <div class="create-time-container">
                    <div class="create-time-title">修改时间:</div>
                    <div class="create-time">{{loginInfo.updateTime}}</div>
                </div>

                <div class="create-time-container">
                    <div class="create-time-title">上次登陆ip:</div>
                    <div class="create-time">{{loginInfo.lastIp}}</div>
                </div>

                <div class="create-time-container">
                    <div class="create-time-title">上次登陆时间:</div>
                    <div class="create-time">{{loginInfo.lastTime}}</div>
                </div>

                <div class="change-password" @click="ConfirmUntie" style="background-color: #00C5AA" v-if="isTieWeChat">
                    微信解绑
                </div>

                <div class="change-password" @click="ConfirmDelete">删除账户</div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {getModule} from 'vuex-module-decorators';
    import {isNotNullTrim} from "../../../../../utils/shared/isNotNullTrim";
    import store from '../../../../../store';
    import ClientModules from '../../../../../store/modules/ClientModules'

    const clientModules = getModule(ClientModules, store);

    export default {
        data() {
            return {
                Status: null,
                basicInformation: {
                    merchantName: null,
                    merchantSimple: null,
                    name: null,
                    username: null,
                },
                transactionType: null,
                authority: [],
                customerControl: null,
                loginInfo: {
                    createTime: null,
                    updateTime: null,
                    lastIp: null,
                    lastTime: null
                },
                isTieWeChat: JSON.parse(this.$route.query.type),
                dragElement: {
                    flags: false,
                    position: {
                        x: 0,
                        y: 0
                    },
                    nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
                }
            }
        },

        mounted() {
            this.dragElement.xPum = document.body.clientWidth - 70
            this.initInformation()
        },

        methods: {
            /**
             * 初始化信息栏，将列表页面的信息传递过来填充到输入框上
             */
            initInformation() {
                let temp = this.$route.query
                for (let i in this.basicInformation) {
                    this.basicInformation[i] = this.$route.query[i]
                }
                this.Status = this.$route.query.statusName
                this.customerControl = this.$route.query.menu.toString()

                if (temp.monitor === true || temp.monitor === "true") {
                    this.authority.push('monitor')
                }
                if (temp.control === true || temp.control === "true") {
                    this.authority.push('control')
                }
                if (temp.trade === true || temp.trade === "true") {
                    this.authority.push('trade')
                }
                if (temp.statistic === true || temp.statistic === "true") {
                    this.authority.push('statistic')
                }
                if (temp.manager === true || temp.manager === "true") {
                    this.authority.push('manager')
                }
                this.transactionType = this.$route.query.payType

                for (let i in this.loginInfo) {
                    if (this.$route.query[i] == null) {
                        this.loginInfo[i] = '暂无'
                    } else {
                        this.loginInfo[i] = this.$route.query[i]
                    }
                }
            },

            /**
<<<<<<< HEAD
=======
             * 检查多选权限框的变化
             */
            authorityChange(data) {
            },


            /**
>>>>>>> guijia
             * 添加子账户信息提交给后台
             */
            CheckRequestData() {
                let mobileReg = /^1[3456789]\d{9}$/;
                let isMobile = mobileReg.exec(this.basicInformation.username);
                for (let i in this.basicInformation) {
                    if (this.basicInformation[i] == null || !isNotNullTrim(this.basicInformation[i])) {
                        this.$Message.error("输入不能为空");
                        return
                    }
                }
                if (!isMobile) {
                    this.$Message.error("请输入正确的手机号码");
                    return
                }

                if(this.basicInformation.merchantName.length >= 10) {
                    this.$Message.error("商家名称不能大于等于10个字");
                    return;
                }

                if(this.basicInformation.name.length > 10) {
                    this.$Message.error("联系人名称不能大于等于10个字");
                    return;
                }

                if (this.authority.length === 0) {
                    this.$Message.error("请选择微信端权限");
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
                if (this.transactionType == '租用' && this.authority.indexOf('manager') !== -1) {
                    this.$Message.error("租用用户无法选择子账户管理权限");
                    return
                }
                this.sendRequest()
            },

            /**
             * 保存前的操作提示
             */
            ConfirmUpdate() {
                this.$Modal.confirm({
                    title: '操作确认',
                    content: '<p>您确认要修改吗</p>',
                    onOk: () => {
                        this.CheckRequestData()
                    },
                });
            },


            /**
             * 格式检查正确后发送请求
             */
            sendRequest() {
                let requestData = {
                    "username": this.basicInformation.username,
                    "userId": this.$route.query.userId,
                    "name": this.basicInformation.name,
                    "merchantName": this.basicInformation.merchantName,
                    "merchantSimple": this.basicInformation.merchantSimple,
                    "status": 0,	// 状态值
                    "monitor": false,	// 监控权限
                    "control": false,	// 控制权限
                    "manager": false,	// 用户管理权限
                    "trade": false,	// 交易权限
                    "statistic": false,	// 统计权限
                    "menu": this.customerControl,	// 客户端权限
                    "payType": false
                }

                if (this.Status === '启用') {
                    requestData.status = 1;
                }

                if (this.transactionType === '买断') {
                    requestData.payType = true
                } else {
                    requestData.payType = false
                }

                for (let i = 0; i < this.authority.length; i++) {
                    requestData[this.authority[i]] = true
                }

                clientModules.UpdateClientInfo(JSON.stringify(requestData)).then((res) => {
                    if (res.code == 3001) {
                        localStorage.removeItem('AuthorizationAdmin')
                        this.$router.push({name: 'login'})
                        this.$Message.error(res.message);
                    }
                    if (res.code == -1) {
                        this.$Message.error(res.message);
                    } else {
                        this.$Message.success('修改成功');
                        this.$router.push({
                            name: 'user',
                        })
                    }

                })
            },

            /**
             * 路由传输数据到打印机列表页面，形式url拼接
             */
            toPrinter() {
                this.$router.push({
                        name: 'watchPrinter',
                        query: this.$route.query
                    }
                )
            },

            /**
             * 路由跳转修改密码页面
             */
            toModifyPassword() {
                this.$router.push({
                        name: 'ModifyPassword',
                        query: this.$route.query
                    }
                )
            },

            /**
             * 路由跳转查看子账户页面
             */
            toSubAccountList() {
                this.$router.push({
                        name: 'SubAccountList',
                        query: {
                            userId: this.$route.query.userId
                        }
                    }
                )
            },

            /**
             * 路由跳转修改密码页面
             */
            toFatherResetPassword() {
                this.$router.push({
                        name: 'resetClientPassword',
                        query: {
                            userId: this.$route.query.userId,
                            notOneself: true
                        }
                    }
                )
            },

            /**
             * 删除父账户的确认
             */
            ConfirmDelete() {
                this.$Modal.confirm({
                    title: '操作确认',
                    content: '<p>您确定要删除账户吗</p>',
                    onOk: () => {
                        this.deleteAccount(this.$route.query.userId)
                    },
                });
            },

            /**
             * 删除父账户的确认
             */
            deleteAccount(userId) {
                clientModules.DeleteClientAccount(JSON.stringify({"userId": userId})).then((res) => {
                    if (res.code === "3001" || res.code === 3001) {
                        localStorage.removeItem('AuthorizationAdmin')
                        this.$router.push({name: 'login'})
                        this.$Message.error('删除成功');
                    } else if (res.code === "-1" || res.code === -1) {
                        this.$Message.error('删除失败');
                    } else {
                        this.$Message.success('删除成功');
                        this.$router.push({
                            name: 'user'
                        })
                    }
                })
            },

            /**
             * 微信解绑前的操作确认
             */
            ConfirmUntie() {
                this.$Modal.confirm({
                    title: '操作确认',
                    content: '<p>你确认要微信解绑吗</p>',
                    onOk: () => {
                        this.WeChatUntie(this.$route.query.userId)
                    },
                });
            },

            /**
             *  微信解绑
             */
            WeChatUntie(userId) {
                clientModules.WxUntie(JSON.stringify({"userId": userId})).then((res) => {
                    if (res.code === "3001" || res.code === 3001) {
                        localStorage.removeItem('AuthorizationAdmin')
                        this.$router.push({name: 'login'})
                        this.$Message.error(res.message);
                    } else if (res.code === "-1" || res.code === -1) {
                        this.$Message.error(res.message);
                    } else {
                        this.$Message.success("解绑成功");
                        this.$router.go(-1);
                    }
                })
            },

            /**
             *  鼠标点击准备拖拽
             */
            down() {
                this.dragElement.flags = true;
                let touch ;
                if(event.touches){
                    //touchList返回当前所有与touch表面触摸的对象
                    touch = event.touches[0];
                }else {
                    touch = event;
                }
                //返回触点相对于可见视区(visual viewport)左边沿的的X坐标.
                // 不包括任何滚动偏移.这个值会根据用户对可见视区的缩放行为而发生变化.
                this.dragElement.position.x = touch.clientX;
                this.dragElement.position.y = touch.clientY;
                this.dragElement.dx = this.$refs.moveDiv.offsetLeft;
                this.dragElement.dy = this.$refs.moveDiv.offsetTop;
            },

            /**
             *  拖拽发生的时候
             */
            move(){
                let that = this
                if(this.dragElement.flags){
                    let touch ;
                    if(event.touches){
                        touch = event.touches[0];
                    }else {
                        touch = event;
                    }
                    this.$refs.moveDiv.style.borderRadius = '30px 30px 30px 30px'
                    this.dragElement.nx = touch.clientX - this.dragElement.position.x;
                    this.dragElement.ny = touch.clientY - this.dragElement.position.y;
                    this.dragElement.xPum = this.dragElement.dx + this.dragElement.nx;
                    this.dragElement.yPum = this.dragElement.dy + this.dragElement.ny;
                    this.$refs.moveDiv.style.left = this.dragElement.xPum + "px";
                    this.$refs.moveDiv.style.top = this.dragElement.yPum + "px";
                    document.body.addEventListener('touchmove', function (e) {
                        if(that.dragElement.flags){
                            e.preventDefault();
                        }else{
                            return true
                        }
                    }, {passive: false});
                }
            },

            /**
             *  鼠标释放的时候
             */
            end(){
                //获取屏幕宽度
                let ScreenWidth = document.body.clientWidth
                let ScreenHeight = document.body.clientHeight
                //超出上下边界的处理
                if(this.dragElement.yPum < 0 || this.dragElement.yPum > ScreenHeight) {
                    this.$refs.moveDiv.style.top = "30%"
                }
                //假如元素位于左半边则落在左侧,假如元素位于右半边则落在屏幕右侧
                if(this.dragElement.xPum >= ScreenWidth / 2 ) {
                    this.$refs.moveDiv.style.borderRadius = '30px 0 0 30px'
                    this.$refs.moveDiv.style.left = (ScreenWidth - 70) + 'px'
                } else if(this.dragElement.xPum < ScreenWidth / 2){
                    this.$refs.moveDiv.style.borderRadius = '0 30px 30px 0'
                    this.$refs.moveDiv.style.left = 0
                }
                this.dragElement.flags = false;
            },
        }
    }

</script>