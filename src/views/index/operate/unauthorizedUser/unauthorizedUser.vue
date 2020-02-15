<style scoped>
.unauthorizedUser {
  position: relative;
  height: 100vh;
  width: 100%;
}
.top {
  position: fixed;
  top: 0;
  width: 100%;
  height: 3rem;
  z-index: 100;
  background-color: white;
}
.top h2 {
  padding-top: 0.65rem;
  font-size: 20.8px;
  font-weight: 400;
}
.super-manager-card {
  border: 1px solid transparent;
  height: 8.4rem;
  padding: 0.1rem 0;
  font-size: 1rem;
  background-color: white;
  padding: 3rem;
}
.super-manager-card p {
  margin-top: 0.4rem;
}
.super-manager-card h1 {
  font-size: 1.55rem;
  font-weight: 500;
}
.user-container {
  width: 86%;
  margin: 0 auto;
  padding-top: 0.5rem;
  font-size: 1rem;
}
.user-card {
  min-height: 2.6rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #d7dde4;
}
.user-container .user-title {
  float: left;
}
.user-container p {
  text-align: right;
}
.revise-pwd {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0.6rem 0;
  border-top: 2px solid #d7dde4;
  text-align: center;
  font-size: 1.1rem;
  color: #00c5aa;
  background-color: white;
  margin-top: 2.3rem;
}
.draw-button {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 1rem;
}
.wx-button {
  display: inline-block;
  width: 50%;
  padding: 0.7rem 0;
  color: white;
  background-color: #00c5aa;
}
.pwd-button {
  display: inline-block;
  width: 50%;
  padding: 0.7rem 0;
  color: #999999;
  background-color: #f7f7f7;
}
.displayNone {
  display: none;
}
.line {
  background: #f5f5f5;
  width: 100%;
  height: 0.4rem;
}
</style>

<template>
  <div class="unauthorizedUser">
    <div class="top"></div>
    <div class="super-manager-card">
      <h1>{{userData.name}}</h1>
      <p class="super-username">
        <img
          src="../../../../assets/img/mobilePhone.png"
          style="position: absolute;width: 0.95rem;"
        />
        <span style="padding-left:1.2rem;">{{userData.username}}</span>
      </p>
    </div>
    <div class="line"></div>
    <div class="user-container">
      <div class="user-card">
        <div class="user-title">权限</div>
        <p :class="{displayNone: !userData.printer}">
          打印机模块
          <img src="../../../../assets/img/true.png" style="width:1rem;margin-left: 0.1rem;" />
        </p>
        <p :class="{displayNone: !userData.statistic}">
          数据统计
          <img src="../../../../assets/img/true.png" style="width:1rem;margin-left: 0.1rem;" />
        </p>
        <p :class="{displayNone: !userData.customer}">
          商户管理
          <img src="../../../../assets/img/true.png" style="width:1rem;margin-left: 0.1rem;" />
        </p>
        <p :class="{displayNone: !userData.admin}">
          运营管理
          <img src="../../../../assets/img/true.png" style="width:1rem;margin-left: 0.1rem;" />
        </p>
        <p :class="{displayNone: !noAuthority}">无</p>
      </div>
      <div class="user-card">
        <div class="user-title">上次登录IP</div>
        <p>{{userData.lastIp? userData.lastIp:'无'}}</p>
      </div>
      <div style="margin-top: 0.5rem;">
        <div class="user-title">上次登录时间</div>
        <p>{{userData.lastTime? userData.lastTime:'无'}}</p>
      </div>
    </div>
    <div class="revise-pwd" @click="resetPwd">修改密码</div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      userData: {},
      notOneself: false,
      noAuthority: false
    };
  },
  methods: {
    getData() {
      let that = this;
    },

    resetPwd() {
      this.$router.push({
        path: "./authorizedUser/resetManagerPwd",
        query: {
          adminId: this.userData.adminId,
          notOneself: this.notOneself
        }
      });
    },
    instance(type, contentType, message) {
      const title = "提示";
      let error = {
        login: "请重新登陆",
        ajax: message
      };
      let content = null;
      if (contentType == "time") {
        content = `<p>${error.timeError}</p>`;
      } else if (contentType == "login") {
        content = `<p>${error.login}</p>`;
      } else if (contentType == "ajax") {
        content = `<p>${error.ajax}</p>`;
      }

      switch (type) {
        case "info":
          this.$Modal.info({
            title: title,
            content: content
          });
          break;
        case "success":
          this.$Modal.success({
            title: title,
            content: content
          });
          break;
        case "warning":
          this.$Modal.warning({
            title: title,
            content: content
          });
          break;
        case "error":
          this.$Modal.error({
            title: title,
            content: content
          });
          break;
      }
    }
  },
  mounted() {
    document.title = "个人信息";
    this.userData = JSON.parse(localStorage.getItem("AuthorizationAdmin")).managerInfo;
    if (
      !this.userData.admin &&
      !this.userData.customer &&
      !this.userData.printer &&
      !this.userData.statistic
    ) {
      this.noAuthority = true;
    }
  },
  watch: {}
};
</script>

