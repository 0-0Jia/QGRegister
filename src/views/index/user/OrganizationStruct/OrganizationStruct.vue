<style scoped lang="scss">
    .organization-container {
        height: 100vh;
        background-color: rgb(247,247,247);
    }

    .top {
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
    }

    .group-name {
        height: 3rem;
        width: 90%;
        margin: auto;
        text-align: left;
        font-size: 1.2rem;
        line-height: 3rem;
    }

    .bottom-container {
        padding-top: 50px;
    }

    .create-container {
        height: 5rem;
        background-color: white;

        .inner-container {
            height: 5rem;
            padding: 0.5rem 0 0.5rem 1rem;
        }

        .image-icon {
            float: left;
            height: 100%;
            width: 4rem;
            border-radius: 6px;
            background-image: url("../../../../assets/boss.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 60%;
        }

        .create-info {
            float: left;
            height: 100%;
            background-color: white;
            margin-left: 0.5rem;
        }

        .create-name {
            height: 50%;
            line-height: 2rem;
            text-align: left;
            font-size: 1rem;

        }

        .create-phone {
            height: 50%;
            background-color: white;
            line-height: 2rem;
            text-align: left;
        }

        .edit-founder {
            float: right;
            height: 100%;
            width: 50px;
            background-image: url("../../../../assets/edit.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 50%;
        }

    }

    .son-container {
        position: relative;
        height: 3.5rem;
        border-bottom: 1px solid #e2dedee6;
        background-color: white;

        .image-circle-container {
            position: absolute;
            top: 4px;
            height: 52px;
            padding-left: 1rem;
            background-color: white;

            .image-circle {
                height: 48px;
                width: 48px;
                background-color: rgb(75, 149, 254);
                border-radius: 50%;
                font-size: 3.2rem;
                background-image: url("../../../../assets/people.png");
                background-repeat: no-repeat;
                background-position: center;
                background-size: 60%;
            }
        }

        .son-info-container {
            position: absolute;
            overflow: hidden;
            left: 71px;
            height: 100%;
            line-height: 56px;
            font-size: 1rem;
            text-align: left;
        }
    }

    .change-info-image {
        position: absolute;
        right: 0;
        height: 100%;
    }

    .change-info-image {
        position: absolute;
        height: 100%;
        top: 0;
        width: 50px;
        background-image: url("../../../../assets/edit.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 50%;
        right: 0;
    }

    .line {
        position: absolute;
        width: 48px;
        top: 46px;
        height: 3px;
        background-color: rgb(75,188,132);
    }

    .division-line {
        height: 1rem;
        background-color: #f9f6f6;
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
    <div class="organization-container">
        <div class="top">
            <div class="modules-title">组织架构</div>
        </div>
        <transition name="slide-fade" appear>
            <div class="bottom-container">
                <div class="group-name">
                    <span style="color: #00c5aa">公司</span><span style="color: #c7c3c3;font-weight: bold">＞</span><span
                        style="color: #6d6b6b">{{groupName}}</span>
                </div>

                <div class="create-container">
                    <div>
                        <div class="inner-container">
                            <div class="image-icon"></div>

                            <div class="create-info">
                                <div class="create-name">{{founder}}</div>
                                <div class="create-phone">手机:{{founderNum}}</div>
                            </div>

                            <div class="edit-founder" @click="editFounder"></div>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 1rem">
                    <div class="son-container" v-for="(clientList, item) in SubAccountList" v-bind:key="item">
                        <div class="image-circle-container">
                            <div class="image-circle"></div>
                        </div>
                        <div class="son-info-container">
                            <div style="line-height: 23px; padding-top: 8px">{{clientList.name}}</div>
                            <div style="line-height: 23px"><span
                                    style="font-size: 0.8rem">手机:{{clientList.username}}</span></div>
                        </div>
                        <div class="change-info-image" @click="toEdit(item)"></div>
                    </div>

                    <div class="division-line"></div>

                    <div class="son-container" style="border-bottom: 0;background-image: none;"
                         @click="toAddSubAccount">
                        <div class="image-circle-container">
                            <div class="image-circle"
                                 style="text-align: center;line-height: 48px;color: white;background-color: rgb(75,188,132);background-image: none">
                                +
                            </div>
                            <div class="line"></div>
                        </div>
                        <div class="son-info-container">
                            <div>添加新成员</div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>


<script>
    import ClientModules from '../../../../store/modules/ClientModules'
    import {getModule} from 'vuex-module-decorators';
    import store from '../../../../store';

    const clientModules = getModule(ClientModules, store);
    export default {
        data() {
            return {
                show: true,
                addClientInformation: false,
                SubAccountList: [],
                groupName: this.$route.query.merchantName,
                founder: this.$route.query.name,
                founderNum: this.$route.query.username
            }
        },
        mounted() {
            this.getSubAccount()
        },
        methods: {
            /**
             * 获得创始人旗下的子账号
             */
            getSubAccount() {
                clientModules.getSubAccountList(this.$route.query.userId).then((res) => {
                    if (res.code == 3001) {
                        localStorage.removeItem('AuthorizationAdmin')
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
                        this.SubAccountList = res.data
                        for (let i = 0; i < this.SubAccountList.length; i++) {
                            if (this.SubAccountList[i].payType === true) {
                                this.SubAccountList[i].payType = '买断'
                            } else
                                this.SubAccountList[i].payType = '租用'
                        }
                    }
                })
            },

            /**
             * 跳转到增加子账户页面
             */
            toAddSubAccount() {
                this.$router.push({
                        name: 'addSubAccount',
                        query: this.$route.query
                    }
                )
            },

            /**
             * 跳转到编辑页面
             */
            toEdit(index) {
                let data = this.SubAccountList[index]
                data.fathermonitor = this.$route.query.monitor
                data.fathertrade = this.$route.query.trade
                data.fathermanager = this.$route.query.manager
                data.fathercontrol = this.$route.query.control
                data.fatherstatistic = this.$route.query.statistic
                this.$router.push({
                        name: 'editSubAccount',
                        query: data
                    }
                )
            },

            /**
             * 修改创始人信息
             */
            editFounder() {
                this.$router.push({
                        name: 'editClientInformation',
                        query: this.$route.query
                    }
                )
            }
        }
    }
</script>