<style scoped lang="scss">
    .addClientInformation-container {
        width: 100%;
        z-index: 100;
    }

    .addClientInformation-module-title {
        height: 50px;
        width: 100%;
        position: fixed;
        background-color: white;
        top: 0;
        z-index: 50;
    }

    .addClientInformation-module-container {
        height: 50px;
        width: 100%;
        line-height: 50px;
        font-size: 1.3rem;
        background-color: white;
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
        margin: 50px auto;
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

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-enter
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateX(10px);
        opacity: 0;
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
        touch-action: none;
    }


</style>

<template>
    <div class="addClientInformation-container">
        <div class="modify-password-container" @click="toResetPassword"
             @mousedown="down" @touchstart="down"
             @mousemove="move" @touchmove="move"
             @mouseup="end" @touchend="end"
             ref="moveDiv"
        >
            修改密码
        </div>

        <div class="addClientInformation-module-title">
            <div class="addClientInformation-module-container">编辑子账户信息</div>
            <div class="save-btn" @click="ConfirmUpdate">保存</div>
        </div>

        <transition name="slide-fade" appear>
            <div class="bottom-container">
                <div class="form-data-container">
                    <div class="input-title"><span style="color: red" >* </span>账户名称:</div>
                    <div class="input-container">
                        <input v-model="basicInformation.name" placeholder="请输入子账户名称" style="width: 100%;" maxlength="20"/>
                    </div>
                </div>

                <div class="form-data-container">
                    <div class="input-title"><span style="color: red">* </span>手机/账号:</div>
                    <div class="input-container">
                        <input v-model="basicInformation.username" placeholder="请输入手机/账号" style="width: 100%"/>
                    </div>
                </div>

                <div class="authority-container">
                    <div class="authority-title"><span style="color: red">* </span>微信端功能权限</div>
                    <div class="authority-select">
                        <CheckboxGroup v-model="authority" @on-change="authorityChange">
                            <div class="checkbox-container" v-if="authorityShow.monitor">
                                <Checkbox label="monitor">打印机监控</Checkbox>
                            </div>
                            <div class="checkbox-container" v-if="authorityShow.control">
                                <Checkbox label="control">打印机远程控制</Checkbox>
                            </div>
                            <div class="checkbox-container" v-if="authorityShow.trade">
                                <Checkbox label="trade">交易列表</Checkbox>
                            </div>
                            <div class="checkbox-container" v-if="authorityShow.statistic">
                                <Checkbox label="statistic">数据统计</Checkbox>
                            </div>
                            <div class="checkbox-container" v-if="authorityShow.manager">
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
                    <div class="create-time-title">上次登陆IP:</div>
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
    import store from '../../../../../store';
    import ClientModules from '../../../../../store/modules/ClientModules'
    import {PhoneFormat} from "../../../../../utils/shared/phoneFormat";
    import {isNotNullTrim} from "../../../../../utils/shared/isNotNullTrim";

    const clientModules = getModule(ClientModules, store);

    export default {
        data() {
            return {
                Status: null,
                basicInformation: {
                    name: null,
                    username: null,
                },
                transactionType: [],
                authority: [],
                customerControl: null,
                loginInfo: {
                    createTime: null,
                    updateTime: null,
                    lastIp: null,
                    lastTime: null
                },
                isTieWeChat: JSON.parse(this.$route.query.type),
                authorityShow: {
                    monitor: JSON.parse(this.$route.query.fathermonitor),
                    control: JSON.parse(this.$route.query.fathercontrol),
                    trade: JSON.parse(this.$route.query.fathertrade),
                    statistic: JSON.parse(this.$route.query.fatherstatistic),
                    manager: JSON.parse(this.$route.query.fathermanager),
                },
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
                    this.basicInformation[i] = temp[i]
                }
                this.Status = temp.statusName
                this.customerControl = temp.menu.toString()

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
             * 提交信息前的信息检验
             */
            CheckRequestData() {
                for (let i in this.basicInformation) {
                    if (this.basicInformation[i] == null || !isNotNullTrim(this.basicInformation[i])) {
                        this.$Message.error("请补充完信息");
                        return
                    }
                }

                if (PhoneFormat(this.basicInformation.username)) {
                    this.$Message.error("请输入正确的手机");
                    return;
                }

                if(this.basicInformation.name.length > 10) {
                    this.$Message.error("联系人名称不能大于等于10个字");
                    return;
                }

                if (this.Status == null || !isNotNullTrim(this.Status)) {
                    this.$Message.error("请选择状态");
                    return
                }

                if (this.authority.length === 0) {
                    this.$Message.error("请选择权限");
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
                this.sendRequest()
            },

            /**
             * 提交信息给后台
             */
            sendRequest() {
                let requestData = {
                    "name": this.basicInformation.name,
                    "userId": this.$route.query.userId,
                    "username": this.basicInformation.username,
                    "status": 0,	// 状态值
                    "monitor": false,	// 监控权限
                    "control": false,	// 控制权限
                    "manager": false,	// 用户管理权限
                    "trade": false,	// 交易权限
                    "statistic": false,	// 统计权限
                    "menu": this.customerControl,	// 客户端权限
                }

                for (let i = 0; i < this.authority.length; i++) {
                    requestData[this.authority[i]] = 1
                }

                if (this.Status === '启用') {
                    requestData.status = 1
                } else {
                    requestData.status = 0
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
                        this.$Message.success("修改成功");
                        this.$router.go(-1)
                    }
                })
            },

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
             * 删除商户操作确认
             */
            ConfirmDelete() {
                //删除前的操作确认
                this.$Modal.confirm({
                    title: '操作确认',
                    content: '<p>您确认要删除吗</p>',
                    onOk: () => {
                        this.deleteAccount(this.$route.query.userId)
                    },
                    onCancel: () => {
                        return
                    }
                });
            },

            /**
             * 删除商户子账号
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
                        this.$router.go(-1);
                    }
                })
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
                        this.$router.go(-1)
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
                    onCancel: () => {
                        return
                    }
                });
            },

            /**
             * 路由跳转修改密码页面
             */
            toResetPassword() {
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
                }
                document.body.addEventListener('touchmove', function (e) {
                    if(that.dragElement.flags === true){
                        e.preventDefault();
                    }else{
                        return true
                    }
                }, {passive: false});
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
